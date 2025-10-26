import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { invalidateSiteQueries } from '@/lib/siteQueries';
import { FALLBACK_PRICING } from '@shared/fallbackData';
import { withApiBase } from '@/lib/apiBase';

interface PricingItem {
  id: string;
  name: string;
  price: string;
}

export default function EditPricing() {
  const { toast } = useToast();
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const res = await fetch(withApiBase('/api/pricing'));
        if (!res.ok) throw new Error('Failed to load pricing');
        const data = await res.json();
        setPricing(
          data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
        );
        setReadOnly(false);
      } catch (error) {
        console.warn('Falling back to static pricing data in admin panel.', error);
        setPricing(
          FALLBACK_PRICING.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
        );
        setReadOnly(true);
      }
    };

    loadPricing();
  }, []);

  const handlePriceChange = (id: string, value: string) => {
    setPricing((items) =>
      items.map((item) => (item.id === id ? { ...item, price: value } : item)),
    );
  };

  const queryClient = useQueryClient();

  const handleSave = async (id: string) => {
    if (readOnly) {
      toast({
        title: 'Backend required',
        description: 'Configure VITE_API_BASE_URL to connect to your API before saving pricing.',
      });
      return;
    }
    setLoading(true);
    const item = pricing.find(p => p.id === id);
    if (!item) return;
    const res = await fetch(withApiBase(`/api/pricing/${id}`), {
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
                type="text"
                value={item.price}
                onChange={e => handlePriceChange(item.id, e.target.value)}
                className="border p-2 rounded w-40"
                disabled={readOnly}
              />
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => handleSave(item.id)}
                disabled={loading || readOnly}
              >
                Save
              </button>
            </div>
          ))}
        </div>
        {readOnly && (
          <p className="mt-4 text-sm text-muted-foreground">
            Static demo pricing is displayed. Configure the backend to enable editing.
          </p>
        )}
      </div>
    </div>
  );
}
