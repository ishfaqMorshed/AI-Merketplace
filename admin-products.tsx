import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ManageProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product> & { file?: File | null }>({ name: '', description: '', price: 0, file: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'file') {
      setForm(f => ({ ...f, file: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.name || '');
    formData.append('description', form.description || '');
    formData.append('price', String(form.price || 0));
    if (form.file) formData.append('thumbnail', form.file);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const res = await fetch(url, { method, body: formData });
    if (res.ok) {
      toast({ title: editingId ? 'Product updated!' : 'Product added!', variant: 'success' });
      setForm({ name: '', description: '', price: 0, file: null });
      setEditingId(null);
      fetchProducts();
    } else {
      toast({ title: 'Error', description: 'Failed to save product', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setForm({ ...product, file: null });
    setEditingId(product.id);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Product deleted!', variant: 'success' });
      fetchProducts();
    } else {
      toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
        <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
          <input name="name" value={form.name || ''} onChange={handleInput} placeholder="Product Name" className="border p-2 rounded w-full" required />
          <textarea name="description" value={form.description || ''} onChange={handleInput} placeholder="Description" className="border p-2 rounded w-full" required />
          <input name="price" type="number" value={form.price || 0} onChange={handleInput} placeholder="Price" className="border p-2 rounded w-full" required />
          <input name="file" type="file" accept="image/*" onChange={handleInput} className="w-full" />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" className="ml-2 text-sm underline" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: 0, file: null }); }}>Cancel</button>
          )}
        </form>
        <div className="grid gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4 flex items-center gap-4">
              {product.thumbnail && <img src={product.thumbnail} alt={product.name} className="w-20 h-20 object-cover rounded" />}
              <div className="flex-1">
                <div className="font-bold">{product.name}</div>
                <div className="text-sm text-muted-foreground">{product.description}</div>
                <div className="text-primary font-semibold mt-1">${product.price}</div>
              </div>
              <button className="text-blue-600 mr-2" onClick={() => handleEdit(product)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
