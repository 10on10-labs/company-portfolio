import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const maxDuration = 60; // Allow 60 seconds for generation

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'en';

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const isLocal = process.env.NODE_ENV === 'development';

    let browser;
    if (isLocal) {
      // Local development: use local chrome
      const puppeteerLocal = await import('puppeteer-core');
      // You might need to adjust the executablePath for your specific OS/Chrome install
      // Trying common locations or using a library like chrome-launcher if needed.
      // For now, I'll assume standard Mac Chrome location or rely on channel.
      browser = await puppeteerLocal.launch({
        channel: 'chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      // Production (Vercel/Lambda): use sparticuz/chromium
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 1200, height: 630 },
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();

    // Construct the URL to visit
    // Adjust protocol/host as needed. In production use DEPLOYED_URL.
    const baseUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL || 'http://localhost:3000';
    // Wait, user is on port 3001 in dev usually? Checking previous logs...
    // Env says 3000 in logs, but user URL said 3001.
    // Safe bet: use request host or configured env.

    // Let's rely on passed host or default.
    const url = `${baseUrl}/${locale}/blogs/${slug}`;
    console.log(`Generating PDF for: ${url}`);

    // Optimize wait condition: 'domcontentloaded' is much faster than 'networkidle0'
    // 'networkidle0' waits for all network requests (including analytics, etc.) to finish, which leads to timeouts.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Force screen media type to ensure print styles don't hide content
    await page.emulateMediaType('screen');

    // Explicitly wait for the blog content to be present using the specific ID
    await page.waitForSelector('#blog-pdf-root', { timeout: 10000 });

    // Auto-scroll to trigger lazy loading of images
    // Next.js Image component lazy loads by default. We need to scroll down to trigger loading.
    await page.evaluate(async () => {
      const distance = 100;
      const delay = 50; // Faster scroll
      // Scroll to bottom
      while (
        document.scrollingElement &&
        document.scrollingElement.scrollTop + window.innerHeight <
          document.scrollingElement.scrollHeight
      ) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      // Scroll back to top to ensure layout is stable? No, print usually handles it, but let's leave it at bottom or scroll up?
      // Some lazy loaders unload if you scroll away. Next.js usually keeps them.
      // Let's scroll back up quickly just in case layout depends on it, but usually not needed for PDF.
      // actually, let's keep it at bottom or just ensure everything is triggered.

      // Force all images to load eagerly if possible
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.setAttribute('loading', 'eager');
        // @ts-ignore
        if (img.decode) img.decode().catch(() => {});
      });
    });

    // Wait for any network requests triggered by the scroll (like image fetches) to finish
    try {
      await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 });
    } catch {
      console.warn('Network idle timeout - proceeding anyway');
    }

    // Final check: Wait for all images in the blog root to be 'complete'
    await page.evaluate(async () => {
      const images = Array.from(
        document.querySelectorAll('#blog-pdf-root img'),
      ) as HTMLImageElement[];
      await Promise.all(
        images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // Don't block on broken images
            // Timeout safety
            setTimeout(resolve, 2000);
          });
        }),
      );
    });

    // Give a small buffer for final rendering
    await new Promise(r => setTimeout(r, 500));

    // Read logo file for embedding in header
    // We use fs to read the public file directly on the server to ensure we have the base64 data
    const fs = await import('fs');
    const path = await import('path');

    // Try to resolve the logo path. In Next.js dev vs prod, cwd might differ.
    // 1. Root of repo: apps/web/public/logo.png
    // 2. Apps/web root: public/logo.png
    const possiblePaths = [
      path.join(process.cwd(), 'apps/web/public/logo.png'),
      path.join(process.cwd(), 'public/logo.png'),
    ];

    let logoBase64 = '';

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        try {
          const logoBuffer = fs.readFileSync(p);
          logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
          console.log(`Loaded logo from: ${p}`);
          break;
        } catch (e) {
          console.error(`Error reading logo at ${p}:`, e);
        }
      }
    }

    if (!logoBase64) {
      console.warn('Could not find logo.png in:', possiblePaths);
    }

    // Match TopNavbar styling: The logo sits on a white rounded square.
    // Since the PDF header is white, we might need to emulate the navbar context if the logo is white.
    // But TopNavbar puts a WHITE box behind it. This implies the logo is likely dark or colored,
    // and the white box is for the shape/iconography.
    // We'll add the background anyway to be safe and match the look.
    const headerTemplate = `
      <div style="font-size: 10px; width: 100%; display: flex; align-items: center; padding: 0 20px; margin-bottom: 10px; border-bottom: 1px solid #eee;">
        <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 6px; margin-right: 10px;">
           <img src="${logoBase64}" style="height: 24px; width: auto;" alt="10on10 Labs" />
        </div>
        <span style="font-weight: 600; color: #333;">10on10Labs</span>
        <span style="margin-left: auto; color: #888;">Blog</span>
      </div>
    `;

    // Optional: Hide specific elements (like the CTA button itself!) before printing
    await page.evaluate(() => {
      // Fix for single-page issue: Reset height/overflow constraints
      const style = document.createElement('style');
      style.textContent = `
          html, body {
            height: auto !important;
            overflow: visible !important;
            width: auto !important;
            position: static !important;
          }
          #blog-pdf-root {
            height: auto !important;
            overflow: visible !important;
          }
          /* Eliminate huge top gaps often caused by padding on main or body */
          body, main, #blog-pdf-root {
             padding-top: 0 !important;
             margin-top: 0 !important;
          }
        `;
      document.head.appendChild(style);

      // 1. Hide Global Header, Footer, and Breadcrumbs
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';

      const footer = document.querySelector('footer');
      if (footer) footer.style.display = 'none';

      const nav = document.querySelector('nav');
      if (nav) nav.style.display = 'none';

      // Specifically target breadcrumbs if they are not the main nav
      // Tailwind shadcn breadcrumbs usually are inside a nav or list.
      // Common selector: nav[aria-label="breadcrumb"] or class containing breadcrumb
      const breadcrumbs = document.querySelectorAll('[aria-label="breadcrumb"], .breadcrumb');
      breadcrumbs.forEach(el => ((el as HTMLElement).style.display = 'none'));

      // 2. Hide "Download PDF" CTAs
      const buttons = Array.from(document.querySelectorAll('button'));
      buttons.forEach(btn => {
        if (
          btn.textContent?.includes('Download PDF') ||
          btn.textContent?.includes('Generating PDF')
        ) {
          const card =
            btn.closest('.mb-8') || btn.closest('.card') || btn.closest('.border-orange-200');
          if (card) {
            (card as HTMLElement).style.display = 'none';
          } else {
            btn.style.display = 'none';
          }
        }
      });

      // 3. Hide "Related Blogs" section
      const article = document.getElementById('blog-pdf-root');
      if (article) {
        const sections = article.querySelectorAll('section');
        sections.forEach(sec => {
          const h2 = sec.querySelector('h2');
          if (
            h2 &&
            (h2.textContent?.toLowerCase().includes('related') ||
              h2.textContent?.toLowerCase().includes('blogs'))
          ) {
            sec.style.display = 'none';
          }
          if (sec.querySelectorAll('a[href*="/blogs/"]').length > 1) {
            if (sec.className.includes('mt-16')) {
              sec.style.display = 'none';
            }
          }
        });
      }
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate:
        '<div style="font-size: 10px; width: 100%; text-align: center; padding-bottom: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: {
        top: '60px', // Increased to accommodate header
        bottom: '40px', // Increased for footer
        left: '20px',
        right: '20px',
      },
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 },
    );
  }
}
