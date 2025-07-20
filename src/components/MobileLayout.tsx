import { ReactNode } from 'react';
import { Card } from './ui/card';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MobileLayout = ({ children, className = "" }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container max-w-md mx-auto px-4 py-6">
        <Card className={`bg-gradient-card shadow-medical-lg border-0 ${className}`}>
          {children}
        </Card>
      </div>
    </div>
  );
};