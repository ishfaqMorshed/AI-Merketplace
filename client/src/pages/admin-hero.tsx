import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { invalidateSiteQueries } from '@/lib/siteQueries';
import { FALLBACK_HERO } from '@shared/fallbackData';
import { withApiBase } from '@/lib/apiBase';

export default function EditHeroSection() {
  const { toast } = useToast();
  const [hero, setHero] = useState({ title: '', subtitle: '' });
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await fetch(withApiBase('/api/hero'));
        if (!res.ok) throw new Error('Failed to load hero');
        const data = await res.json();
        setHero({ title: data.title ?? '', subtitle: data.subtitle ?? '' });
        setReadOnly(false);
      } catch (error) {
        console.warn('Falling back to static hero data in admin panel.', error);
        setHero({ title: FALLBACK_HERO.title, subtitle: FALLBACK_HERO.subtitle });
        setReadOnly(true);
      }
    };

    loadHero();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(h => ({ ...h, [name]: value }));
  };

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) {
      toast({
        title: 'Backend required',
        description: 'Connect the admin to a running API (set VITE_API_BASE_URL) to save changes.',
      });
      return;
    }
    setLoading(true);
    const res = await fetch(withApiBase('/api/hero'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hero),
    });
    if (res.ok) {
      toast({ title: 'Hero section updated!', variant: 'default' });
      // invalidate so homepage refetches
      invalidateSiteQueries(queryClient);
    } else {
      toast({ title: 'Error', description: 'Failed to update hero section', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="title" value={hero.title} onChange={handleInput} placeholder="Hero Title" className="border p-2 rounded w-full" required disabled={readOnly} />
          <textarea name="subtitle" value={hero.subtitle} onChange={handleInput} placeholder="Hero Subtitle" className="border p-2 rounded w-full" required disabled={readOnly} />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading || readOnly}>
            Save
          </button>
          {readOnly && (
            <p className="text-sm text-muted-foreground">
              Static demo content is in use. Configure the backend to enable editing.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
