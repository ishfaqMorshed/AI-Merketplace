import express from 'express';
import { db, isDatabaseEnabled } from '../db';
import { pricing as pricingTable } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { listFallbackPricing, updateFallbackPricing } from '../fallbackData';

const router = express.Router();

// Get all pricing entries
router.get('/', async (_req, res) => {
  if (!isDatabaseEnabled || !db) {
    return res.json(listFallbackPricing());
  }

  const allPricing = await db.select().from(pricingTable);
  res.json(allPricing);
});

// Update a pricing entry by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (!isDatabaseEnabled || !db) {
    const updated = updateFallbackPricing(id, { price: String(price ?? '') });
    if (!updated) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(updated);
  }

  // Only update price
  const [updated] = await db
    .update(pricingTable)
    .set({ price: String(price) })
    .where(eq(pricingTable.id, id))
    .returning();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

export default router;
