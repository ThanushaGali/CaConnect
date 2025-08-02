import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Clock,
  MessageCircle,
  Download,
  Star,
  ArrowLeft,
  FileText,
  Phone
} from "lucide-react";
import { mockRetainers } from "@/data/mockData";

export default function ServiceDetails() {
  const { id } = useParams();
  const retainer = mockRetainers.find(r => r.id === id);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: 'client' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  if (!retainer) {
    return (
      <Layout user={mockUser}>
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">Service not found</p>
              <Button variant="outline" asChild>
                <Link to="/client/services">Back to Services</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-500';
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'paid': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link to="/client/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{retainer.serviceName}</h1>
            <p className="text-muted-foreground">Service Details</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Service Overview
                  <Badge className={`${getStatusColor(retainer.status)} text-white`}>
                    {retainer.status.charAt(0).toUpperCase() + retainer.status.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{retainer.description}</p>
                </div>
                
                <Separator />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Start Date</h4>
                    <p className="text-muted-foreground">{new Date(retainer.startDate).toLocaleDateString()}</p>
                  </div>
                  {retainer.endDate && (
                    <div>
                      <h4 className="font-medium">Completion Date</h4>
                      <p className="text-muted-foreground">{new Date(retainer.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">Service Amount</h4>
                    <p className="text-2xl font-bold text-primary">₹{retainer.amount.toLocaleString()}</p>
                  </div>
                </div>

                {retainer.status === 'ongoing' && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Progress</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{width: '65%'}}></div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Timeline/Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Service Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium">Service Started</p>
                      <p className="text-sm text-muted-foreground">{new Date(retainer.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Initial Documentation Received</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                    <div>
                      <p className="font-medium text-muted-foreground">Review in Progress</p>
                      <p className="text-sm text-muted-foreground">Current stage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CA Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your CA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" />
                    <AvatarFallback>
                      {retainer.caName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{retainer.caName}</h3>
                    <p className="text-sm text-muted-foreground">Chartered Accountant</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Message sent!')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Call scheduled!')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {retainer.status === 'completed' && (
                  <>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Files downloaded!')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Files
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Rating submitted!')}>
                      <Star className="h-4 w-4 mr-2" />
                      Rate Service
                    </Button>
                  </>
                )}
                
                {retainer.status === 'pending' && (
                  <Button variant="gradient" size="sm" className="w-full" onClick={() => alert('Payment processed!')}>
                    Pay Now
                  </Button>
                )}

                <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Invoice opened!')}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Invoice
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">Service Agreement</p>
                      <p className="text-xs text-muted-foreground">PDF • 2 MB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => alert('Service Agreement downloaded!')}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {retainer.status === 'completed' && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">Final Report</p>
                        <p className="text-xs text-muted-foreground">PDF • 5 MB</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => alert('Final Report downloaded!')}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}