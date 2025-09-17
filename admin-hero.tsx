import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";

export default function EditHeroSection() {
  const { toast } = useToast();
  const [hero, setHero] = useState({ title: '', subtitle: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/hero').then(res => res.json()).then(setHero);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(h => ({ ...h, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hero),
    });
    if (res.ok) {
  toast({ title: 'Hero section updated!', variant: 'default' });
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
          <input name="title" value={hero.title} onChange={handleInput} placeholder="Hero Title" className="border p-2 rounded w-full" required />
          <textarea name="subtitle" value={hero.subtitle} onChange={handleInput} placeholder="Hero Subtitle" className="border p-2 rounded w-full" required />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
