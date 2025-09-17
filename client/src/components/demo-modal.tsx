import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { Calendar } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DemoBookingForm {
  fullName: string;
  email: string;
  company: string;
  productInterest: string;
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<DemoBookingForm>({
    fullName: '',
    email: '',
    company: '',
    productInterest: 'AI Business Chatbot',
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: DemoBookingForm) => {
      const response = await apiRequest('POST', '/api/demo-bookings', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo booked successfully!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/demo-bookings'] });
      onOpenChange(false);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        productInterest: 'AI Business Chatbot',
      });
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof DemoBookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">{t.demo.title}</DialogTitle>
          <p className="text-muted-foreground">{t.demo.subtitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium">
              {t.demo.fullName}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
              data-testid="input-full-name"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              {t.demo.email}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              data-testid="input-email"
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-sm font-medium">
              {t.demo.company}
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Your company name"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              data-testid="input-company"
            />
          </div>
          
          <div>
            <Label htmlFor="productInterest" className="text-sm font-medium">
              {t.demo.productInterest}
            </Label>
            <Select value={formData.productInterest} onValueChange={(value) => handleInputChange('productInterest', value)}>
              <SelectTrigger data-testid="select-product-interest">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI Business Chatbot">AI Business Chatbot</SelectItem>
                <SelectItem value="Automated Recruiting System">Automated Recruiting System</SelectItem>
                <SelectItem value="Both Products">Both Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              {t.demo.cancel}
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={bookingMutation.isPending}
              data-testid="button-book-demo"
            >
              {bookingMutation.isPending ? "Booking..." : t.demo.book}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
