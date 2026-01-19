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

    // Optional: Hide specific elements (like the CTA button itself!) before printing
    await page.evaluate(() => {
      // Fix for single-page issue: Reset height/overflow constraints that might prevent paging
      const style = document.createElement('style');
      style.textContent = `
          html, body {
            height: auto !important;
            overflow: visible !important;
            width: auto !important;
            position: static !important;
          }
          /* Ensure the blog root can expand */
          #blog-pdf-root {
            height: auto !important;
            overflow: visible !important;
          }
        `;
      document.head.appendChild(style);

      // Example: Hide the PDF download buttons so they don't appear in the PDF
      const ctas = document.querySelectorAll('button');
      ctas.forEach(b => {
        // ... existing logic ...
        if (b.textContent?.includes('Download PDF')) {
          b.style.display = 'none';
        }
      });
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
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
