import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Phone, 
  Mail,
  Calendar,
  Award,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { mockCAs } from "@/data/mockData";

export default function CAProfile() {
  const { id } = useParams();
  const ca = mockCAs.find(c => c.id === id);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: 'client' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  const mockReviews = [
    {
      id: "1",
      clientName: "ABC Pvt Ltd",
      rating: 5,
      comment: "Excellent service! Rajesh completed our GST registration quickly and efficiently.",
      date: "2024-01-10",
      service: "GST Registration"
    },
    {
      id: "2",
      clientName: "XYZ Corp",
      rating: 4,
      comment: "Professional and knowledgeable. Would recommend for tax related work.",
      date: "2024-01-05",
      service: "ITR Filing"
    }
  ];

  if (!ca) {
    return (
      <Layout user={mockUser}>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">CA not found</h1>
          <Button asChild className="mt-4">
            <Link to="/client/browse">Back to Browse</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/client/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={ca.avatar} alt={ca.name} />
                    <AvatarFallback className="text-lg">
                      {ca.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">{ca.name}</h1>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {ca.location}
                        </div>
                      </div>
                      <Badge 
                        variant={ca.availability === 'available' ? 'default' : 'secondary'}
                        className={ca.availability === 'available' ? 'bg-success' : ''}
                      >
                        {ca.availability}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">{ca.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {ca.domains.map((domain) => (
                        <Badge key={domain} variant="outline">
                          {domain}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        {ca.rating} ({ca.reviewCount} reviews)
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {ca.completedProjects} projects
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {ca.experience} years experience
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ca.services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Duration: {service.duration}</span>
                            <Badge variant="outline">{service.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-primary">₹{service.basePrice}</div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/client/hire/${ca.id}?service=${service.id}`}>
                              Select
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{review.clientName}</h4>
                            <p className="text-sm text-muted-foreground">{review.service}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About {ca.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Professional Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        {ca.experience} years of experience in accounting and taxation. 
                        Specialized in {ca.domains.join(', ')}. Has successfully completed 
                        {ca.completedProjects} projects with a {ca.rating} star rating.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Qualifications</h4>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">Chartered Accountant (CA)</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {ca.domains.map((domain) => (
                          <Badge key={domain} variant="secondary">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact & Hire */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                  <span className="font-semibold">₹{ca.pricing.hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Consultation</span>
                  <span className="font-semibold">₹{ca.pricing.consultationFee}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button className="w-full" variant="gradient" size="lg" asChild>
                  <Link to={`/client/hire/${ca.id}`}>
                    Hire Now
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="text-sm font-medium">Within 2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Repeat Clients</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}