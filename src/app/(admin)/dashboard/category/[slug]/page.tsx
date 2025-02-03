export default async function EditCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1 className="font-display">Edit Category {slug} Page</h1>;
}
