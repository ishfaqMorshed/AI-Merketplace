import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/components/language-provider';
import { type Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 mx-4 mt-4 rounded-2xl bg-white border border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="flex items-center space-x-2" data-testid="link-home">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">AI Solutions</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className={`font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-home">{t.nav.home}</span>
            </Link>
            <Link href="/products">
              <span className={`font-medium transition-colors hover:text-primary ${location === '/products' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-products">{t.nav.products}</span>
            </Link>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="link-nav-pricing">
              {t.nav.pricing}
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="link-nav-contact">
              {t.nav.contact}
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-[120px]" data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-get-started">
              {t.nav.getStarted}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
