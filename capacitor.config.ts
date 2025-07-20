import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.66dfaaaabb3b494782f1173f15f4fcb9',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://66dfaaaa-bb3b-4947-82f1-173f15f4fcb9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;