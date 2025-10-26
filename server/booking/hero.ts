import express from 'express';
import { db, isDatabaseEnabled } from '../db';
import { heroSection } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { getFallbackHero, updateFallbackHero } from '../fallbackData';

const router = express.Router();

// Always use the first row (single hero section)
router.get('/', async (_req, res) => {
  if (!isDatabaseEnabled || !db) {
    return res.json(getFallbackHero());
  }

  let hero = await db.select().from(heroSection).limit(1);
  if (!hero.length) {
    // Insert default if not present
    const inserted = await db
      .insert(heroSection)
      .values({
        title: 'Transform Your Business with AI Solutions',
        subtitle:
          'Discover powerful AI tools designed for local businesses. From intelligent chatbots to automated recruiting systems, we have the solutions to streamline your operations.',
      })
      .returning();
    return res.json(inserted[0]);
  }
  res.json(hero[0]);
});

router.put('/', async (req, res) => {
  const { title, subtitle } = req.body;

  if (!isDatabaseEnabled || !db) {
    const updated = updateFallbackHero({ title, subtitle });
    return res.json(updated);
  }

  let hero = await db.select().from(heroSection).limit(1);
  if (!hero.length) {
    const inserted = await db.insert(heroSection).values({ title, subtitle }).returning();
    return res.json(inserted[0]);
  }
  const [updated] = await db
    .update(heroSection)
    .set({ title, subtitle })
    .where(eq(heroSection.id, hero[0].id))
    .returning();
  res.json(updated);
});

export default router;
