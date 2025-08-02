import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  FileText,
  Eye,
  MessageCircle,
  Star,
  Filter,
  Download
} from "lucide-react";
import { mockRetainers } from "@/data/mockData";

export default function MyServices() {
  const [activeTab, setActiveTab] = useState("all");

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: 'client' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-500';
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'paid': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRetainers = mockRetainers.filter(retainer => {
    if (activeTab === "all") return true;
    return retainer.status === activeTab;
  });

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Services</h1>
            <p className="text-muted-foreground">Track and manage your ongoing services</p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/client/browse">Find New CA</Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {filteredRetainers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all" 
                      ? "No services found. Start by hiring a CA!" 
                      : `No ${activeTab} services found.`
                    }
                  </p>
                  {activeTab === "all" && (
                    <Button variant="outline" asChild>
                      <Link to="/client/browse">Browse CAs</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredRetainers.map((retainer) => (
                  <Card key={retainer.id} className="hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face`} />
                                <AvatarFallback>
                                  {retainer.caName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold">{retainer.serviceName}</h3>
                                <p className="text-sm text-muted-foreground">by {retainer.caName}</p>
                              </div>
                            </div>
                            <Badge 
                              className={`${getStatusColor(retainer.status)} text-white`}
                            >
                              {retainer.status.charAt(0).toUpperCase() + retainer.status.slice(1)}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {retainer.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Started: {new Date(retainer.startDate).toLocaleDateString()}
                            </div>
                            {retainer.endDate && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                Completed: {new Date(retainer.endDate).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-primary">₹{retainer.amount}</span>
                            </div>
                          </div>

                          {/* Progress bar for ongoing services */}
                          {retainer.status === 'ongoing' && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>65%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="lg:w-48 flex flex-col gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/client/service/${retainer.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message CA
                          </Button>

                          {retainer.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Files
                            </Button>
                          )}

                          {retainer.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              Rate Service
                            </Button>
                          )}

                          {retainer.status === 'pending' && (
                            <Button variant="gradient" size="sm">
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {mockRetainers.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Services</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {mockRetainers.filter(r => r.status === 'ongoing').length}
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success">
                {mockRetainers.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                ₹{mockRetainers.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}