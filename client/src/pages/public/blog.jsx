export default function Blog() {
const blogs = [
{ id: 1, title: "How Online Learning is Changing Education", author: "Admin" },
{ id: 2, title: "Top Skills to Learn in 2025", author: "Team LMS" },
{ id: 3, title: "Student Success Stories", author: "Community" }
];


return (
<div className="max-w-6xl mx-auto px-6 py-10">
<h1 className="text-3xl font-bold mb-6">Blog</h1>


<div className="space-y-4">
{blogs.map(blog => (
<div key={blog.id} className="border p-4 rounded">
<h3 className="font-semibold text-xl">{blog.title}</h3>
<p className="text-sm text-gray-600">By {blog.author}</p>
</div>
))}
</div>
</div>
);
}