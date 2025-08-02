import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Download,
  Eye
} from "lucide-react";

export default function Earnings() {
  const mockUser = {
    name: "Priya Sharma",
    email: "priya@caexpert.com", 
    role: 'ca' as const,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=32&h=32&fit=crop&crop=face"
  };

  const mockEarnings = [
    {
      id: "e1",
      clientName: "Tech Solutions Pvt Ltd",
      serviceName: "GST Filing - Q3 2024",
      amount: 15000,
      status: "received",
      date: "2024-01-15",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "e2",
      clientName: "Retail Enterprises", 
      serviceName: "Income Tax Return",
      amount: 8000,
      status: "pending",
      date: "2024-01-10",
      paymentMethod: "UPI"
    },
    {
      id: "e3",
      clientName: "Manufacturing Co.",
      serviceName: "Audit Services",
      amount: 25000,
      status: "received",
      date: "2024-01-05",
      paymentMethod: "Bank Transfer"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'processing': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const totalReceived = mockEarnings
    .filter(e => e.status === 'received')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalPending = mockEarnings
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
            <p className="text-muted-foreground">Track your payments and revenue</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Received</p>
                  <p className="text-2xl font-bold">₹{totalReceived.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending</p>
                  <p className="text-2xl font-bold text-warning">₹{totalPending.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">This Month</p>
                  <p className="text-2xl font-bold text-foreground">₹{(totalReceived * 0.6).toLocaleString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Growth</p>
                  <p className="text-2xl font-bold text-success">+12%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {mockEarnings.map((earning) => (
                <Card key={earning.id} className="hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{earning.serviceName}</h3>
                          <Badge className={getStatusColor(earning.status)}>
                            {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">Client: {earning.clientName}</p>
                        <p className="text-muted-foreground text-sm">Payment Method: {earning.paymentMethod}</p>
                        <p className="text-muted-foreground text-sm">Date: {new Date(earning.date).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{earning.amount.toLocaleString()}</p>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="received" className="mt-6">
            <div className="grid gap-4">
              {mockEarnings.filter(e => e.status === 'received').map((earning) => (
                <Card key={earning.id} className="hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{earning.serviceName}</h3>
                        <p className="text-muted-foreground text-sm">Client: {earning.clientName}</p>
                        <p className="text-muted-foreground text-sm">Date: {new Date(earning.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-success">₹{earning.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-4">
              {mockEarnings.filter(e => e.status === 'pending').map((earning) => (
                <Card key={earning.id} className="hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{earning.serviceName}</h3>
                        <p className="text-muted-foreground text-sm">Client: {earning.clientName}</p>
                        <p className="text-muted-foreground text-sm">Date: {new Date(earning.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-warning">₹{earning.amount.toLocaleString()}</p>
                        </div>
                        <Button variant="gradient" size="sm">
                          Follow Up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}