import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../db';
import { products as productsTable } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

// No in-memory store; use DB

// Multer setup for thumbnail uploads (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({
  dest: path.join(__dirname, '../../client/public/uploads'),
});

router.get('/', async (req, res) => {
  const dbProducts = await db.select().from(productsTable);
  res.json(dbProducts);
});

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const { name, description, price } = req.body;
  let thumbnail = '';
  const file = (req as any).file;
  if (file) {
    thumbnail = `/uploads/${file.filename}`;
  }
  const [product] = await db.insert(productsTable).values({ name, description, price, thumbnail }).returning();
  res.status(201).json(product);
});

router.put('/:id', upload.single('thumbnail'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  let thumbnail;
  const file = (req as any).file;
  if (file) {
    thumbnail = `/uploads/${file.filename}`;
  }
  const updateData: any = { name, description, price };
  if (thumbnail) updateData.thumbnail = thumbnail;
  const [product] = await db.update(productsTable).set(updateData).where(eq(productsTable.id, id)).returning();
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.delete(productsTable).where(eq(productsTable.id, id));
  res.status(204).end();
});

export default router;
