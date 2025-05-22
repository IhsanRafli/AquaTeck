
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen, Truck, MapPin, Check, PackageCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample tracking data
const sampleTrackings = [
  {
    id: "TRK123456789",
    customerName: "Budi Santoso",
    status: "delivered", // "processing", "shipped", "out-for-delivery", "delivered"
    productName: "Kandang Jaring Apung Premium (5m)",
    orderId: "ORD98765432",
    trackingEvents: [
      { date: "2025-05-15T14:30:00", status: "Pesanan Diterima", location: "Gudang Pusat Jakarta" },
      { date: "2025-05-16T09:45:00", status: "Pesanan Diproses", location: "Gudang Pusat Jakarta" },
      { date: "2025-05-17T11:20:00", status: "Pesanan Dikirim", location: "Jakarta" },
      { date: "2025-05-19T08:30:00", status: "Dalam Perjalanan", location: "Bandung" },
      { date: "2025-05-20T10:15:00", status: "Pesanan Diterima", location: "Alamat Tujuan" },
    ]
  },
  {
    id: "TRK987654321",
    customerName: "Dewi Lestari",
    status: "shipped", // "processing", "shipped", "out-for-delivery", "delivered"
    productName: "Sistem Pemantauan Kualitas Air",
    orderId: "ORD12345678",
    trackingEvents: [
      { date: "2025-05-18T13:20:00", status: "Pesanan Diterima", location: "Gudang Pusat Surabaya" },
      { date: "2025-05-19T10:30:00", status: "Pesanan Diproses", location: "Gudang Pusat Surabaya" },
      { date: "2025-05-20T09:15:00", status: "Pesanan Dikirim", location: "Surabaya" },
    ]
  }
];

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = () => {
    if (!trackingId.trim()) {
      toast({
        title: "Error",
        description: "Masukkan ID pelacakan pesanan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundTracking = sampleTrackings.find(
        t => t.id.toLowerCase() === trackingId.trim().toLowerCase() || 
             t.orderId.toLowerCase() === trackingId.trim().toLowerCase()
      );
      
      if (foundTracking) {
        setTrackingData(foundTracking);
        toast({
          title: "Pesanan Ditemukan",
          description: "Detail pesanan berhasil ditemukan",
        });
      } else {
        setTrackingData(null);
        toast({
          title: "Pesanan Tidak Ditemukan",
          description: "Detail pesanan tidak dapat ditemukan. Periksa ID pelacakan anda",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  // Get status icon based on current status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <PackageOpen className="h-8 w-8 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-8 w-8 text-blue-500" />;
      case 'out-for-delivery':
        return <MapPin className="h-8 w-8 text-purple-500" />;
      case 'delivered':
        return <Check className="h-8 w-8 text-green-500" />;
      default:
        return <PackageCheck className="h-8 w-8 text-gray-500" />;
    }
  };

  // Get status text based on current status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return "Sedang Diproses";
      case 'shipped':
        return "Telah Dikirim";
      case 'out-for-delivery':
        return "Sedang Diantar";
      case 'delivered':
        return "Telah Diterima";
      default:
        return "Status Tidak Diketahui";
    }
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Lacak Pesanan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Masukkan nomor pelacakan atau ID pesanan Anda untuk melacak status pesanan Anda.
            </p>
          </div>
          
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="text"
                placeholder="Masukkan ID Pelacakan atau Nomor Pesanan"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleTrackOrder}
                className="bg-ocean-600 hover:bg-ocean-700 text-white min-w-[120px]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mencari...
                  </span>
                ) : "Lacak"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Contoh ID pelacakan: TRK123456789 or TRK987654321
            </p>
          </div>

          {trackingData && (
            <div className="animate-fade-in">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    {getStatusIcon(trackingData.status)}
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Pesanan {getStatusText(trackingData.status)}
                      </h2>
                      <p className="text-gray-600">
                        ID Pelacakan: <span className="font-medium">{trackingData.id}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Nama Pelanggan</h3>
                      <p className="text-gray-900">{trackingData.customerName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Produk</h3>
                      <p className="text-gray-900">{trackingData.productName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">ID Pesanan</h3>
                      <p className="text-gray-900">{trackingData.orderId}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        trackingData.status === 'delivered' 
                          ? 'bg-green-100 text-green-800'
                          : trackingData.status === 'shipped' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getStatusText(trackingData.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Pelacakan</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200 before:h-full">
                {trackingData.trackingEvents.map((event: any, index: number) => (
                  <div key={index} className="relative flex items-start">
                    <div className={`absolute left-0 rounded-full ring-8 ring-white ${
                      index === 0 ? 'bg-green-500' : 'bg-ocean-500'
                    } h-4 w-4`}></div>
                    <div className="ml-10">
                      <h4 className="font-medium text-gray-900">{event.status}</h4>
                      <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                      <p className="text-sm text-gray-700">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!trackingData && !loading && trackingId && (
            <div className="text-center py-10">
              <PackageCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Pesanan Tidak Ditemukan</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Kami tidak dapat menemukan pesanan dengan ID pelacakan yang Anda masukkan.
                Harap periksa ID pelacakan Anda dan coba lagi.
              </p>
            </div>
          )}

          {!trackingId && !loading && !trackingData && (
            <div className="text-center py-10">
              <PackageCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Masukkan ID Pelacakan</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Masukkan ID pelacakan Anda di atas untuk melihat status pengiriman pesanan Anda.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
