import { useLanguage } from '@/components/language-provider';
import { Brain } from 'lucide-react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary/30 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">AI Solutions</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <FaTwitter className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="link-twitter" />
              <FaFacebook className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="link-facebook" />
              <FaLinkedin className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid="link-linkedin" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.footer.products}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/chatbot-product" className="hover:text-foreground transition-colors" data-testid="link-chatbot">AI Business Chatbot</a></li>
              <li><a href="/recruiting-product" className="hover:text-foreground transition-colors" data-testid="link-recruiting">Recruiting System</a></li>
              <li><a href="/products" className="hover:text-foreground transition-colors" data-testid="link-coming-soon">Coming Soon</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.footer.support}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-docs">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">Contact Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-book-demo">Book Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li data-testid="text-email">support@aisolutions.com</li>
              <li data-testid="text-phone">+1 (555) 123-4567</li>
              <li data-testid="text-address">San Francisco, CA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p data-testid="text-copyright">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
