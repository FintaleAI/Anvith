import BlogEditorPage from "@/components/admin/BlogEditor";

export const metadata = { title: "New Article — Admin" };

export default function NewBlogPage() {
  return <BlogEditorPage blog={null} />;
}
