import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface QRCodeScannerProps {
  onScanComplete: (patientData: any) => void;
  isScanning?: boolean;
}

export const QRCodeScanner = ({ onScanComplete, isScanning = false }: QRCodeScannerProps) => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);

  useEffect(() => {
    if (scanStatus === 'scanning' && scannerRef.current) {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      html5QrCodeRef.current = html5QrCode;
      html5QrCode
        .start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: 200 },
          (decodedText: string) => {
            setScanStatus('success');
            try {
              // Defensive: prevent navigation or reload if QR contains a URL or script
              if (decodedText.startsWith('http') || decodedText.startsWith('data:') || decodedText.includes('<script')) {
                setError('Invalid QR code content');
                setScanStatus('error');
                try { html5QrCode.stop(); } catch (e) {}
                return;
              }
              const data = JSON.parse(decodedText);
              if (!data || typeof data !== 'object' || !data.name) {
                setError('QR code does not contain valid patient data');
                setScanStatus('error');
                try { html5QrCode.stop(); } catch (e) {}
                return;
              }
              try {
                onScanComplete(data);
              } catch (err) {
                console.error('Error in onScanComplete:', err);
                setError('An error occurred after scanning.');
                setScanStatus('error');
              }
            } catch (e) {
              setError('Invalid QR code data');
              setScanStatus('error');
            }
            try { html5QrCode.stop(); } catch (e) {}
          },
          (err: any) => {
            // ignore scan errors
          }
        )
        .catch((err: any) => {
          setError('Camera error or permission denied');
          setScanStatus('error');
        });
    }
    return () => {
      if (html5QrCodeRef.current) {
        try { html5QrCodeRef.current.stop(); } catch (e) {}
        try { html5QrCodeRef.current.clear(); } catch (e) {}
      }
    };
  }, [scanStatus, onScanComplete]);

  return (
    <Card className="bg-gradient-card shadow-medical-md">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        {scanStatus !== 'success' && (
          <div className="flex flex-col items-center justify-center">
            {scanStatus !== 'scanning' ? (
              <Button onClick={() => { setScanStatus('scanning'); setError(null); }} variant="scan">
                Start QR Scan
              </Button>
            ) : (
              <>
                <div id="qr-scanner" ref={scannerRef} style={{ width: 250, height: 250 }} />
                <Button onClick={() => setScanStatus('idle')} variant="outline" className="mt-2">Cancel</Button>
              </>
            )}
            {error && <div className="text-destructive text-sm mt-2">{error}</div>}
          </div>
        )}
        {scanStatus === 'success' && (
          <div className="text-success text-lg">Patient data loaded successfully!</div>
        )}
        {scanStatus === 'error' && (
          <Button onClick={() => { setScanStatus('idle'); setError(null); }} variant="destructive">Try Again</Button>
        )}
      </CardContent>
    </Card>
  );
};