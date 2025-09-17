// Pricing
import pricingRouter from './booking/pricing';
import heroRouter from './booking/hero';
import productsRouter from './booking/products';
import bookingRouter from './booking/routes';
import geminiChatRouter from './booking/gemini-chat';
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoBookingSchema } from "@shared/schema";
import { geminiChat } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pricing endpoint
  app.use('/api/pricing', pricingRouter);
  // Hero section endpoint
  app.use('/api/hero', heroRouter);
  // Product management endpoint
  app.use('/api/products', productsRouter);
  // Booking system endpoint
  app.use('/api/booking', bookingRouter);
  // Gemini chat endpoint
  app.use('/api/gemini-chat', geminiChatRouter);
  // Demo booking endpoints
  app.post("/api/demo-bookings", async (req, res) => {
    try {
      const bookingData = insertDemoBookingSchema.parse(req.body);
      const booking = await storage.createDemoBooking(bookingData);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid booking data", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.get("/api/demo-bookings", async (req, res) => {
    try {
      const bookings = await storage.getDemoBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch bookings",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Chat endpoints for live demo (Gemini)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, companyName = "your company" } = req.body;
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      let session;
      if (sessionId) {
        session = await storage.getChatSession(sessionId);
      }
      if (!session) {
        session = await storage.createChatSession({ messages: [] });
      }
      const messages = [...(session.messages as any[]), { role: "user", content: message }];
      // Use Gemini API with Oishy persona
      const aiMessage = await geminiChat(messages, companyName);
      const updatedMessages = [...messages, { role: "assistant", content: aiMessage }];
      await storage.updateChatSession(session.id, updatedMessages);
      res.json({
        response: aiMessage,
        sessionId: session.id
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        message: "Failed to process chat message",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
