import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { sendChatMessage, type ChatMessage } from '@/lib/openai';
import { Bot, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI business assistant. I can help you with inventory, orders, and customer inquiries. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMessage, sessionId);
      
      // Add a small delay to simulate typing
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
        setSessionId(response.sessionId);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Chat Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendQuickMessage = (message: string) => {
    setInput(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  const TypingIndicator = () => (
    <div className="flex items-start gap-3">
      <div className="bg-primary text-primary-foreground rounded-lg p-3">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Chat Interface */}
      <div className="chat-demo rounded-lg p-6 border border-border">
        <Card className="p-4 shadow-sm">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Business Assistant
          </h4>
          
          <div className="space-y-3 min-h-[300px] max-h-[300px] overflow-y-auto mb-4" data-testid="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 animate-slide-up ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
                data-testid={`message-${message.role}-${index}`}
              >
                {message.role === 'assistant' && (
                  <Bot className="h-4 w-4 text-primary mt-1" />
                )}
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    message.role === 'user'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <User className="h-4 w-4 text-muted-foreground mt-1" />
                )}
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about inventory, place an order, or any business question..."
              className="flex-1"
              disabled={isLoading}
              data-testid="input-chat"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendQuickMessage('Check inventory for iPhone 15')}
              disabled={isLoading}
              data-testid="button-quick-inventory"
            >
              Check Inventory
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendQuickMessage('Place order for 2 laptops')}
              disabled={isLoading}
              data-testid="button-quick-order"
            >
              Place Order
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendQuickMessage('What are your business hours?')}
              disabled={isLoading}
              data-testid="button-quick-hours"
            >
              Business Hours
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Features Highlight */}
      <div className="space-y-6">
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <i className="fas fa-database text-primary text-lg"></i>
            </div>
            <h4 className="font-semibold">Real-time Data Integration</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Connects to your database for live inventory updates and customer information
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <i className="fas fa-image text-primary text-lg"></i>
            </div>
            <h4 className="font-semibold">Image Processing</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Analyzes product images and provides detailed information and recommendations
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <i className="fas fa-shopping-cart text-primary text-lg"></i>
            </div>
            <h4 className="font-semibold">Order Management</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Processes orders directly and updates your Excel sheets automatically
          </p>
        </Card>
      </div>
    </div>
  );
}
