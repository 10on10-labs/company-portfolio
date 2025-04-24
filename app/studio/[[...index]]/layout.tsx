export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overscroll-none">
        <main className="bg-white flex overscroll-none overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
