import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { invalidateSiteQueries } from '@/lib/siteQueries';

interface PricingItem {
  id: string;
  name: string;
  price: number;
}

export default function EditPricing() {
  const { toast } = useToast();
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/pricing').then(res => res.json()).then(setPricing);
  }, []);

  const handlePriceChange = (id: string, value: string) => {
    setPricing(pricing => pricing.map(item => item.id === id ? { ...item, price: Number(value) } : item));
  };

  const queryClient = useQueryClient();

  const handleSave = async (id: string) => {
    setLoading(true);
    const item = pricing.find(p => p.id === id);
    if (!item) return;
    const res = await fetch(`/api/pricing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: item.price }),
    });
    if (res.ok) {
      toast({ title: 'Pricing updated!', variant: 'default' });
      // Invalidate queries so frontend reloads
      invalidateSiteQueries(queryClient);
    } else {
      toast({ title: 'Error', description: 'Failed to update pricing', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Edit Pricing</h1>
        <div className="space-y-4">
          {pricing.map(item => (
            <div key={item.id} className="flex items-center gap-4 border rounded p-4">
              <div className="flex-1 font-semibold">{item.name}</div>
              <input
                type="number"
                value={item.price}
                onChange={e => handlePriceChange(item.id, e.target.value)}
                className="border p-2 rounded w-32"
              />
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => handleSave(item.id)}
                disabled={loading}
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
