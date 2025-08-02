import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Users,
  Clock,
  Star,
  Calendar,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Activity
} from "lucide-react";

export default function CADashboard() {
  const mockCAUser = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: 'ca' as const,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
  };

  const recentClients = [
    {
      id: "1",
      name: "ABC Pvt Ltd",
      service: "GST Registration",
      status: "ongoing",
      progress: 75,
      lastUpdate: "2024-01-20",
      amount: 5000
    },
    {
      id: "2", 
      name: "XYZ Corp",
      service: "Statutory Audit",
      status: "pending",
      progress: 0,
      lastUpdate: "2024-01-19",
      amount: 25000
    },
    {
      id: "3",
      name: "John Doe",
      service: "ITR Filing",
      status: "completed",
      progress: 100,
      lastUpdate: "2024-01-18",
      amount: 2500
    }
  ];

  const todayReminders = [
    {
      id: "1",
      title: "Submit TDS Return",
      time: "2:00 PM",
      priority: "high",
      client: "ABC Pvt Ltd"
    },
    {
      id: "2",
      title: "Client Call - XYZ Corp",
      time: "4:30 PM", 
      priority: "medium",
      client: "XYZ Corp"
    },
    {
      id: "3",
      title: "Upload Certificate",
      time: "6:00 PM",
      priority: "low",
      client: "John Doe"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-500';
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Layout user={mockCAUser}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {mockCAUser.name}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/ca/profile">
                <FileText className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link to="/ca/clients">
                <Users className="h-4 w-4 mr-2" />
                View All Clients
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed Projects</p>
                  <p className="text-2xl font-bold text-foreground">245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Clients */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Recent Clients</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ca/clients">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`} />
                        <AvatarFallback>
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{client.name}</h4>
                        <p className="text-xs text-muted-foreground">{client.service}</p>
                        {client.status === 'ongoing' && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{client.progress}%</span>
                            </div>
                            <Progress value={client.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Badge 
                        className={`${getStatusColor(client.status)} text-white text-xs`}
                      >
                        {client.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">₹{client.amount}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* This Month's Performance */}
            <Card>
              <CardHeader>
                <CardTitle>This Month's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">₹1,85,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Clients</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Projects Completed</span>
                      <span className="text-sm font-medium">23</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-medium">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Repeat Clients</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Today's Reminders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Today's Reminders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ca/reminders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`mt-1 ${getPriorityColor(reminder.priority)}`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{reminder.title}</h4>
                      <p className="text-xs text-muted-foreground">{reminder.client}</p>
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/ca/schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/ca/earnings">
                    <DollarSign className="h-4 w-4 mr-2" />
                    View Earnings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card>
              <CardHeader>
                <CardTitle>Availability Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">Currently</span>
                  <Badge className="bg-success text-white">Available</Badge>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Set as Busy
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Schedule Break
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}