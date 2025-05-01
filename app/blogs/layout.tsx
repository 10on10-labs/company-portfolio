export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b-accent border-b-2">
        <div className="container mx-auto p-4">
          <div>10 on 10 labs</div>
        </div>
      </header>
      <div className="container mx-auto px-4 pt-4 pb-12">{children}</div>
    </>
  );
}
