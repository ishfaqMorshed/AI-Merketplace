import React from "react";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/admin/products" className="block border rounded-lg p-6 shadow-sm bg-white hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p>Edit, add, or remove products and thumbnails.</p>
        </a>
        <a href="/admin/hero" className="block border rounded-lg p-6 shadow-sm bg-white hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Edit Hero Section</h2>
          <p>Change homepage hero titles and descriptions.</p>
        </a>
        <a href="/admin/pricing" className="block border rounded-lg p-6 shadow-sm bg-white hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Change Pricing</h2>
          <p>Update pricing for all products and solutions.</p>
        </a>
      </div>
    </div>
  );
}
