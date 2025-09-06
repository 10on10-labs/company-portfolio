// app/api/blogs/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import nodemailer from 'nodemailer';
import puppeteer, { type Browser } from 'puppeteer-core';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type PdfEmailPayload = {
  slug: string;
  to: string;
  locale?: 'en' | 'ar';
};

function baseUrl(req: NextRequest) {
  const env = process.env.NEXT_PUBLIC_DEPLOYED_URL;
  if (env) return env.replace(/\/$/, '');
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  return `${proto}://${host}`;
}

async function makePdfFromBlog(req: NextRequest, slug: string, locale: string) {
  const url = `${baseUrl(req)}/${locale}/blogs/${encodeURIComponent(slug)}?print=1`;

  const isDev = process.env.NODE_ENV === 'development';
  const executablePath = isDev
    ? process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : await chromium.executablePath();

  let browser: Browser | undefined;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: ['load', 'networkidle0'] });
    await page.emulateMediaType('print');

    // Hide screen-only UI; set print page settings
    await page.addStyleTag({
      content: `
        .no-print { display:none !important; }
        @page { size: A4; margin: 16mm; }
        html, body { background: #fff; }
      `,
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
    });

    return pdfBuffer;
  } finally {
    try {
      await browser?.close();
    } catch {}
  }
}

export async function POST(req: NextRequest) {
  try {
    // Expect JSON body: { slug, to, locale? }
    const body = (await req.json()) as Partial<PdfEmailPayload>;
    const slug = (body.slug || '').trim();
    const to = (body.to || '').trim();
    const locale = (body.locale || 'en').trim();

    if (!slug) {
      return NextResponse.json({ error: 'Missing "slug" in body' }, { status: 400 });
    }
    if (!to) {
      return NextResponse.json({ error: 'Missing "to" in body' }, { status: 400 });
    }
    if (!['en', 'ar'].includes(locale)) {
      return NextResponse.json({ error: 'Invalid "locale" (use "en" or "ar")' }, { status: 400 });
    }

    // 1) Render PDF from the live page
    const pdfBuffer = await makePdfFromBlog(req, slug, locale);

    // 2) Email via SMTP (SendGrid-style) with Nodemailer
    // For SendGrid SMTP:
    // host: 'smtp.sendgrid.net', port: 587, auth: { user: 'apikey', pass: SENDGRID_API_KEY }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false, // true for 465
      auth: {
        user: process.env.SMTP_USER || 'apikey',
        pass: process.env.SMTP_PASS, // e.g., SENDGRID_API_KEY
      },
    });

    const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@yourdomain.com';

    await transporter.sendMail({
      from,
      to,
      subject: `Your PDF: ${slug}`,
      text: `Attached is the PDF version of the blog "${slug}" (${locale}).`,
      attachments: [
        {
          filename: `${slug}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('PDF email error:', e);
    return NextResponse.json({ error: 'Failed to generate or send PDF' }, { status: 500 });
  }
}
