import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, isDatabaseEnabled } from '../db';
import {
  products as productsTable,
  insertProductSchema,
  updateProductSchema,
} from '../../shared/schema';
import { eq, ilike, and } from 'drizzle-orm';
import { z } from 'zod';
import {
  createFallbackProduct,
  deleteFallbackProduct,
  listFallbackProducts,
  updateFallbackProduct,
  type ProductUpdate as FallbackProductUpdate,
} from '../fallbackData';

const router = express.Router();

// Query validation schema
const getProductsQuerySchema = z.object({
  status: z.enum(['published', 'upcoming']).optional(),
  tag: z.string().min(1).optional(),
});

// Simple admin authentication middleware
const adminAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // Simple token check - replace with proper auth later
  if (!token || token !== 'admin-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

// Multer error handling middleware
const handleMulterError = (
  error: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ message: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected file field.' });
    }
    return res.status(400).json({ message: `Upload error: ${error.message}` });
  }

  if (error?.message?.includes?.('Invalid file type')) {
    return res.status(400).json({ message: error.message });
  }

  next(error);
};

// Multer setup for thumbnail uploads (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced multer configuration with file type and size validation
const upload = multer({
  dest: path.join(__dirname, '../../client/public/uploads'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common image formats
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.'));
    }
  },
});

router.get('/', async (req, res) => {
  try {
    // Validate query parameters
    const validatedQuery = getProductsQuerySchema.parse(req.query);
    const { status, tag } = validatedQuery;

    if (!isDatabaseEnabled || !db) {
      const fallbackProducts = listFallbackProducts({ status, tag });
      return res.json(fallbackProducts);
    }

    // Build where conditions array
    const whereConditions = [];

    if (status) {
      whereConditions.push(eq(productsTable.status, status));
    }

    if (tag) {
      whereConditions.push(ilike(productsTable.tag, `%${tag}%`));
    }

    // Execute query with properly combined conditions
    const dbProducts =
      whereConditions.length > 0
        ? await db.select().from(productsTable).where(and(...whereConditions))
        : await db.select().from(productsTable);

    res.json(dbProducts);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid query parameters',
        errors: error.errors,
      });
    }
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.post(
  '/',
  adminAuth,
  upload.single('thumbnail'),
  handleMulterError,
  async (req: express.Request, res: express.Response) => {
    try {
      // Parse features from JSON string if provided
      let features;
      if (req.body.features) {
        try {
          features = JSON.parse(req.body.features);
        } catch (error) {
          return res
            .status(400)
            .json({ message: 'Invalid features format. Must be valid JSON array.' });
        }
      }

      // Validate the request body
      const validatedData = insertProductSchema.parse({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        tag: req.body.tag || null,
        status: req.body.status || 'published',
        features: features,
      });

      const file = (req as any).file;
      const thumbnail = file ? `/uploads/${file.filename}` : null;
      const normalizedTag = validatedData.tag ?? null;
      const normalizedFeatures = validatedData.features ?? undefined;

      if (!isDatabaseEnabled || !db) {
        const product = createFallbackProduct({
          ...validatedData,
          tag: normalizedTag,
          features: normalizedFeatures ?? null,
          thumbnail,
        });
        return res.status(201).json(product);
      }

      const [product] = await db
        .insert(productsTable)
        .values({
          ...validatedData,
          tag: normalizedTag,
          features: normalizedFeatures,
          thumbnail: thumbnail ?? undefined,
        })
        .returning();

      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        });
      }
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Failed to create product' });
    }
  },
);

router.put(
  '/:id',
  adminAuth,
  upload.single('thumbnail'),
  handleMulterError,
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      // Parse features from JSON string if provided
      let features;
      if (req.body.features) {
        try {
          features = JSON.parse(req.body.features);
        } catch (error) {
          return res
            .status(400)
            .json({ message: 'Invalid features format. Must be valid JSON array.' });
        }
      }

      // Validate the request body (partial update)
      const validatedData = updateProductSchema.parse({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        tag: req.body.tag,
        status: req.body.status,
        features: features,
      });

      // Remove undefined values for partial update
      const updateData = Object.fromEntries(
        Object.entries(validatedData).filter(([, value]) => value !== undefined),
      );

      const file = (req as any).file;
      if (file) {
        updateData.thumbnail = `/uploads/${file.filename}`;
      }

      if (!isDatabaseEnabled || !db) {
        const fallbackUpdate = { ...updateData } as FallbackProductUpdate;
        if ('features' in fallbackUpdate) {
          fallbackUpdate.features =
            (fallbackUpdate.features as string[] | null | undefined) ?? null;
        }
        const product = updateFallbackProduct(id, fallbackUpdate);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(product);
      }

      const [product] = await db
        .update(productsTable)
        .set(updateData)
        .where(eq(productsTable.id, id))
        .returning();

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        });
      }
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product' });
    }
  },
);

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDatabaseEnabled || !db) {
      const deleted = deleteFallbackProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).end();
    }

    // Check if product exists before deleting
    const existingProduct = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await db.delete(productsTable).where(eq(productsTable.id, id));
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;
