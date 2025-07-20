import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeImageProps {
  text: string;
  size?: number;
}

export const QRCodeImage = ({ text, size = 180 }: QRCodeImageProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(text, { width: size, margin: 2 }, (err, url) => {
      if (!err && url) setUrl(url);
    });
  }, [text, size]);

  return url ? <img src={url} width={size} height={size} alt="QR Code" /> : null;
};
