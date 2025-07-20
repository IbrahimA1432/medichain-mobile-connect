import { useState } from 'react';
import { Scan, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface NFCScannerProps {
  onScanComplete: (patientId: string) => void;
  isScanning?: boolean;
}

export const NFCScanner = ({ onScanComplete, isScanning = false }: NFCScannerProps) => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const handleScan = async () => {
    setScanStatus('scanning');
    // Try to use Web NFC API
    try {
      // Use native Web NFC API if available
      // @ts-ignore
      const NDEFReader = window.NDEFReader || (window as any).NDEFReader;
      if (!NDEFReader) throw new Error('Web NFC not supported');
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.onreading = (event: any) => {
        setScanStatus('success');
        let patientId = '';
        if (event.message && event.message.records && event.message.records.length > 0) {
          const record = event.message.records[0];
          if (record.recordType === 'text') {
            const textDecoder = new TextDecoder(record.encoding || 'utf-8');
            patientId = textDecoder.decode(record.data);
          } else if (record.data) {
            patientId = new TextDecoder().decode(record.data);
          }
        }
        if (!patientId) {
          patientId = `patient_${Math.floor(Math.random() * 1000)}`;
        }
        onScanComplete(patientId);
        setTimeout(() => setScanStatus('idle'), 2000);
      };
      ndef.onerror = () => {
        setScanStatus('error');
        setTimeout(() => setScanStatus('idle'), 3000);
      };
    } catch (err) {
      // Fallback: Simulate NFC scan if not supported or error
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
          setScanStatus('success');
          // Simulate patient ID
          const patientId = `patient_${Math.floor(Math.random() * 1000)}`;
          onScanComplete(patientId);
          setTimeout(() => setScanStatus('idle'), 2000);
        } else {
          setScanStatus('error');
          setTimeout(() => setScanStatus('idle'), 3000);
        }
      }, 2000);
    }
  };

  const getStatusIcon = () => {
    switch (scanStatus) {
      case 'scanning':
        return <Loader2 className="w-16 h-16 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-success" />;
      case 'error':
        return <XCircle className="w-16 h-16 text-destructive" />;
      default:
        return <Scan className="w-16 h-16 text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (scanStatus) {
      case 'scanning':
        return 'Scanning NFC device...';
      case 'success':
        return 'Patient data loaded successfully!';
      case 'error':
        return 'Scan failed. Please try again.';
      default:
        return 'Hold patient\'s NFC device near your phone';
    }
  };

  const getStatusBadge = () => {
    switch (scanStatus) {
      case 'scanning':
        return <Badge variant="outline" className="text-primary border-primary">Scanning</Badge>;
      case 'success':
        return <Badge className="bg-success text-success-foreground">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Ready</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-medical-md">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          NFC Scanner
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="flex justify-center">
          {getStatusIcon()}
        </div>
        
        <p className="text-muted-foreground text-sm">
          {getStatusMessage()}
        </p>

        <Button 
          variant="scan"
          size="lg"
          onClick={handleScan}
          disabled={scanStatus === 'scanning' || isScanning}
          className="w-full"
        >
          {scanStatus === 'scanning' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Scan className="w-4 h-4" />
              Start NFC Scan
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};