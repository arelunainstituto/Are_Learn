'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Camera, X } from 'lucide-react';

interface QRReaderProps {
  onScan: (data: { sku?: string; location?: string; [key: string]: any }) => void;
  trigger?: React.ReactNode;
}

export function QRReader({ onScan, trigger }: QRReaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Erro ao acessar a câmera. Verifique as permissões.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualInput = () => {
    const input = prompt('Digite o código QR manualmente:');
    if (input) {
      processQRData(input);
    }
  };

  const processQRData = (data: string) => {
    try {
      // Tenta parsear como JSON (formato do QR-Code-Generator)
      const parsed = JSON.parse(data);
      onScan(parsed);
    } catch {
      // Se não for JSON, trata como SKU simples
      onScan({ sku: data });
    }
    setIsOpen(false);
    stopCamera();
  };

  // Simulação de leitura de QR (em produção, usar biblioteca como zxing-js)
  const simulateQRScan = () => {
    // Dados de exemplo que viriam do QR-Code-Generator
    const mockData = {
      sku: 'TEST-001',
      location: 'A1-B2-C3',
      timestamp: new Date().toISOString(),
      type: 'product'
    };
    processQRData(JSON.stringify(mockData));
  };

  useEffect(() => {
    if (isOpen && !isScanning) {
      startCamera();
    }
    
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            Ler QR Code
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leitura de QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
            {isScanning ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            {isScanning && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-lg"></div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={simulateQRScan} className="flex-1">
              Simular Leitura
            </Button>
            <Button onClick={handleManualInput} variant="outline" className="flex-1">
              Inserir Manual
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Posicione o QR Code dentro do quadrado para leitura automática
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}