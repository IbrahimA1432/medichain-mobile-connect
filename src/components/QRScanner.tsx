import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Patient } from './PatientCard';

interface QRScannerProps {
  onScanSuccess: (patient: Patient) => void;
}

export const QRScanner = ({ onScanSuccess }: QRScannerProps) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false // verbose: set to false or true as needed
    );

    scanner.render((decodedText) => {
      try {
        const patientData = JSON.parse(decodedText) as Patient;
        onScanSuccess(patientData);
        scanner.clear();
      } catch (error) {
        console.error('Invalid QR code data:', error);
      }
    }, (error) => {
      console.warn('QR scan error:', error);
    });

    return () => {
      scanner.clear();
    };
  }, [onScanSuccess]);

  return (
    <div className="rounded-lg border p-4 bg-background">
      <h3 className="text-lg font-medium mb-4">Scan Patient QR Code</h3>
      <div id="qr-reader" className="w-full max-w-sm mx-auto" />
    </div>
  );
};