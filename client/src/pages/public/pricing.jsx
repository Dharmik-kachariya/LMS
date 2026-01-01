export default function Pricing() {
return (
<div className="max-w-6xl mx-auto px-6 py-10">
<h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>


<div className="grid md:grid-cols-3 gap-6">
<div className="border p-6 rounded">
<h3 className="font-semibold text-xl">Free</h3>
<p className="text-gray-600">Access to basic courses</p>
<p className="mt-4 font-bold">₹0</p>
</div>
<div className="border p-6 rounded">
<h3 className="font-semibold text-xl">Pro</h3>
<p className="text-gray-600">All courses + certificates</p>
<p className="mt-4 font-bold">₹999 / month</p>
</div>
<div className="border p-6 rounded">
<h3 className="font-semibold text-xl">Enterprise</h3>
<p className="text-gray-600">Team & corporate training</p>
<p className="mt-4 font-bold">Custom</p>
</div>
</div>
</div>
);
}