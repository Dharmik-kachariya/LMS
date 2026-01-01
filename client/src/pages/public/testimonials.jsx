export default function Testimonials() {
return (
<div className="max-w-6xl mx-auto px-6 py-10">
<h1 className="text-3xl font-bold mb-6">What Our Students Say</h1>


<div className="grid md:grid-cols-3 gap-6">
<div className="border p-4 rounded">
<p>"This LMS helped me land my first developer job!"</p>
<span className="text-sm text-gray-600">– Rahul, India</span>
</div>
<div className="border p-4 rounded">
<p>"Excellent instructors and real‑world projects."</p>
<span className="text-sm text-gray-600">– Anjali</span>
</div>
<div className="border p-4 rounded">
<p>"Best platform for learning online skills."</p>
<span className="text-sm text-gray-600">– Aman</span>
</div>
</div>
</div>
);
}