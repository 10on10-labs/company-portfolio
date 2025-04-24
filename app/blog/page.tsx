const fetchBlogsByCategory = async (category: string | undefined) => {
  if (!category) return;
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string | undefined }>;
}) {
  const { category } = await searchParams;
  const blogs = fetchBlogsByCategory(category);
  return (
    <pre>
      <code>{JSON.stringify(blogs)}</code>
    </pre>
  );
}
