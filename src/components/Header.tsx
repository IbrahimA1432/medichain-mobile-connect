import { User, Settings, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import medicalLogo from '@/assets/medical-logo.png';

interface HeaderProps {
  role: 'doctor' | 'patient';
  userName: string;
  onRoleSwitch: () => void;
  onSettings?: () => void;
}

export const Header = ({ role, userName, onRoleSwitch, onSettings }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border/10">
      <div className="flex items-center gap-3">
        <img 
          src={medicalLogo} 
          alt="Medical Records" 
          className="w-8 h-8"
        />
        <div>
          <h1 className="text-lg font-semibold text-foreground">MedRecord</h1>
          <p className="text-xs text-muted-foreground capitalize">{role} Mode</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRoleSwitch}
          className="text-xs"
        >
          {role === 'doctor' ? <User className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
          Switch to {role === 'doctor' ? 'Patient' : 'Doctor'}
        </Button>
        
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {onSettings && (
          <Button variant="ghost" size="sm" onClick={onSettings}>
            <Settings className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};