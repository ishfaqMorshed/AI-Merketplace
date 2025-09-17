import { type DemoBooking, type InsertDemoBooking, type ChatSession, type InsertChatSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Demo bookings
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  getDemoBookings(): Promise<DemoBooking[]>;
  
  // Chat sessions
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  updateChatSession(id: string, messages: any[]): Promise<ChatSession | undefined>;
}

export class MemStorage implements IStorage {
  private demoBookings: Map<string, DemoBooking>;
  private chatSessions: Map<string, ChatSession>;

  constructor() {
    this.demoBookings = new Map();
    this.chatSessions = new Map();
  }

  async createDemoBooking(insertBooking: InsertDemoBooking): Promise<DemoBooking> {
    const id = randomUUID();
    const booking: DemoBooking = {
      ...insertBooking,
      id,
      company: insertBooking.company || null,
      status: "pending",
      createdAt: new Date(),
    };
    this.demoBookings.set(id, booking);
    return booking;
  }

  async getDemoBookings(): Promise<DemoBooking[]> {
    return Array.from(this.demoBookings.values());
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = randomUUID();
    const session: ChatSession = {
      id,
      messages: insertSession.messages || [],
      createdAt: new Date(),
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }

  async updateChatSession(id: string, messages: any[]): Promise<ChatSession | undefined> {
    const session = this.chatSessions.get(id);
    if (session) {
      session.messages = messages;
      this.chatSessions.set(id, session);
      return session;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
