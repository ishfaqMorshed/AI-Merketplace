import React from "react";

const aiSolutions = [
  {
    name: "AI Chatbot",
    description: "24/7 customer support and lead generation with advanced AI.",
    price: "$49/mo",
  },
  {
    name: "AI Analytics",
    description: "Business insights and analytics powered by AI.",
    price: "$99/mo",
  },
  {
    name: "AI Content Generator",
    description: "Automate blog, ad, and social content creation.",
    price: "$29/mo",
  },
];

export default function AISolutionsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Solutions & Pricing</h1>
      <div className="space-y-6">
        {aiSolutions.map((sol) => (
          <div key={sol.name} className="border rounded-lg p-6 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{sol.name}</h2>
            <p className="mb-2">{sol.description}</p>
            <div className="text-lg font-bold text-blue-600">{sol.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
