import React, { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { invalidateSiteQueries } from '@/lib/siteQueries';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  tag?: string | null;
  status: 'published' | 'upcoming';
  thumbnail?: string;
}

export default function ManageProducts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product> & { file?: File | null }>({
    status: 'published'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    formData.append('name', (form as any).name || '');
    formData.append('description', (form as any).description || '');
    formData.append('price', String((form as any).price || ''));
    if ((form as any).tag) formData.append('tag', (form as any).tag);
    formData.append('status', (form as any).status || 'published');
    if (form.file) formData.append('thumbnail', form.file as any);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const res = await fetch(url, { 
      method, 
      body: formData,
      headers: {
        'Authorization': 'Bearer admin-token'
      }
    });
    if (res.ok) {
      toast({ title: editingId ? 'Product updated!' : 'Product added!', variant: 'default' });
      invalidateSiteQueries(queryClient);
      setForm({});
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
    const res = await fetch(`/api/products/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer admin-token'
      }
    });
    if (res.ok) {
      toast({ title: 'Product deleted!', variant: 'default' });
      invalidateSiteQueries(queryClient);
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
          <input 
            data-testid="input-product-name"
            name="name" 
            value={(form as any).name || ''} 
            onChange={handleInput} 
            placeholder="Product Name" 
            className="border p-2 rounded w-full" 
            required 
          />
          <textarea 
            data-testid="input-product-description"
            name="description" 
            value={(form as any).description || ''} 
            onChange={handleInput} 
            placeholder="Description" 
            className="border p-2 rounded w-full" 
            rows={3}
            required 
          />
          <input 
            data-testid="input-product-price"
            name="price" 
            type="text" 
            value={(form as any).price || ''} 
            onChange={handleInput} 
            placeholder="Price (e.g., $299, Free, Contact Us)" 
            className="border p-2 rounded w-full" 
            required 
          />
          <input 
            data-testid="input-product-tag"
            name="tag" 
            value={(form as any).tag || ''} 
            onChange={handleInput} 
            placeholder="Tag (optional, e.g., Most Popular, New)" 
            className="border p-2 rounded w-full" 
          />
          <select 
            data-testid="select-product-status"
            name="status" 
            value={(form as any).status || 'published'} 
            onChange={handleInput} 
            className="border p-2 rounded w-full"
            required
          >
            <option value="published">Published</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <input 
            data-testid="input-product-thumbnail"
            name="file" 
            type="file" 
            accept="image/*" 
            onChange={handleInput} 
            className="w-full" 
          />
          {form.file && (
            <div className="text-sm text-green-600">Selected: {form.file.name}</div>
          )}
          {editingId && (form as any).thumbnail && (
            <div className="text-sm text-gray-500">
              Current thumbnail: <img src={(form as any).thumbnail} alt="Current" className="inline w-8 h-8 object-cover rounded ml-1" />
            </div>
          )}
          <button 
            data-testid="button-save-product"
            type="submit" 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
          </button>
          {editingId && (
            <button 
              data-testid="button-cancel-edit"
              type="button" 
              className="ml-2 text-sm underline" 
              onClick={() => { setEditingId(null); setForm({ status: 'published' }); }}
            >
              Cancel
            </button>
          )}
        </form>
        <div className="grid gap-6">
          {products.map(product => (
            <div 
              key={product.id} 
              data-testid={`product-card-${product.id}`}
              className="border rounded-lg p-4 flex items-center gap-4"
            >
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  alt={product.name} 
                  className="w-20 h-20 object-cover rounded" 
                />
              )}
              <div className="flex-1">
                <div className="font-bold" data-testid={`product-name-${product.id}`}>
                  {product.name}
                  {product.tag && (
                    <span className="ml-2 px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-semibold" data-testid={`product-price-${product.id}`}>
                    {product.price}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <button 
                data-testid={`button-edit-${product.id}`}
                className="text-blue-600 hover:underline mr-2" 
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button 
                data-testid={`button-delete-${product.id}`}
                className="text-red-600 hover:underline" 
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No products yet. Add your first product above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
