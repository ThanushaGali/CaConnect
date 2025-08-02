import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, FileText, Eye } from "lucide-react";

export default function Clients() {
  const mockUser = {
    name: "Priya Sharma",
    email: "priya@caexpert.com", 
    role: 'ca' as const,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=32&h=32&fit=crop&crop=face"
  };

  const mockClients = [
    {
      id: "c1",
      name: "Tech Solutions Pvt Ltd",
      email: "contact@techsolutions.com",
      phone: "+91 98765 43210",
      status: "ongoing",
      serviceType: "GST Filing",
      lastActivity: "2 days ago",
      totalPaid: 25000
    },
    {
      id: "c2", 
      name: "Retail Enterprises",
      email: "finance@retail.com",
      phone: "+91 87654 32109",
      status: "pending",
      serviceType: "Income Tax Return",
      lastActivity: "1 week ago",
      totalPaid: 15000
    },
    {
      id: "c3",
      name: "Manufacturing Co.",
      email: "accounts@manufacturing.com", 
      phone: "+91 76543 21098",
      status: "completed",
      serviceType: "Audit Services",
      lastActivity: "3 weeks ago",
      totalPaid: 45000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-500';
      case 'pending': return 'bg-warning';
      case 'completed': return 'bg-success';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Clients</h1>
            <p className="text-muted-foreground">Manage your client relationships</p>
          </div>
        </div>

        <div className="grid gap-6">
          {mockClients.map((client) => (
            <Card key={client.id} className="hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=48&h=48&fit=crop&crop=face`} />
                          <AvatarFallback>
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`${getStatusColor(client.status)} text-white`}
                      >
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Service:</span>
                        <p className="text-muted-foreground">{client.serviceType}</p>
                      </div>
                      <div>
                        <span className="font-medium">Last Activity:</span>
                        <p className="text-muted-foreground">{client.lastActivity}</p>
                      </div>
                      <div>
                        <span className="font-medium">Total Paid:</span>
                        <p className="text-primary font-bold">₹{client.totalPaid.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48 flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>

                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>

                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {mockClients.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {mockClients.filter(c => c.status === 'ongoing').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Services</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success">
                ₹{mockClients.reduce((sum, c) => sum + c.totalPaid, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}