import express from 'express';
import { db } from '../db';
import { pricing as pricingTable } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

// Get all pricing entries
router.get('/', async (req, res) => {
  const allPricing = await db.select().from(pricingTable);
  res.json(allPricing);
});

// Update a pricing entry by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  // Only update price
  const [updated] = await db.update(pricingTable)
    .set({ price: String(price) })
    .where(eq(pricingTable.id, id))
    .returning();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

export default router;
