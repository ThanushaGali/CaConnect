import { useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  CreditCard,
  Shield,
  Clock
} from "lucide-react";
import { mockCAs } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function HireCA() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const ca = mockCAs.find(c => c.id === id);
  const preselectedServiceId = searchParams.get('service');
  const preselectedService = ca?.services.find(s => s.id === preselectedServiceId);

  const [selectedService, setSelectedService] = useState(preselectedService?.id || "");
  const [urgency, setUrgency] = useState("");
  const [requirements, setRequirements] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: 'client' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  const selectedServiceData = ca?.services.find(s => s.id === selectedService);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Service request submitted!",
        description: `Your request has been sent to ${ca?.name}. They will respond within 2 hours.`,
      });
      navigate('/client/services');
      setIsSubmitting(false);
    }, 2000);
  };

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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Service Selection Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Hire {ca.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Select Service</Label>
                    <Select value={selectedService} onValueChange={setSelectedService} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ca.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - ₹{service.basePrice}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Custom Service</SelectItem>
                        <SelectItem value="consultation">Consultation Only</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedServiceData && (
                      <p className="text-sm text-muted-foreground">
                        {selectedServiceData.description}
                      </p>
                    )}
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Project Urgency</Label>
                    <Select value={urgency} onValueChange={setUrgency} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Standard (7-14 days)</SelectItem>
                        <SelectItem value="medium">Medium (3-7 days)</SelectItem>
                        <SelectItem value="high">Urgent (1-3 days)</SelectItem>
                        <SelectItem value="critical">Critical (Within 24 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Detailed Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Please describe your requirements in detail. Include any specific documents, deadlines, or special instructions..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="min-h-32"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under ₹5,000</SelectItem>
                        <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
                        <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                        <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                        <SelectItem value="above-50k">Above ₹50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="gradient" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Request..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - CA Info & Summary */}
          <div className="space-y-6">
            {/* CA Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ca.avatar} alt={ca.name} />
                    <AvatarFallback>
                      {ca.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{ca.name}</h3>
                    <p className="text-sm text-muted-foreground">{ca.location}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span>{ca.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span>{ca.rating}/5 ({ca.reviewCount} reviews)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span>Within 2 hours</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-wrap gap-1">
                  {ca.domains.slice(0, 3).map((domain) => (
                    <Badge key={domain} variant="outline" className="text-xs">
                      {domain}
                    </Badge>
                  ))}
                  {ca.domains.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{ca.domains.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Summary */}
            {selectedServiceData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Service</span>
                    <span className="text-sm font-medium">{selectedServiceData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base Price</span>
                    <span className="text-sm font-medium">₹{selectedServiceData.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{selectedServiceData.duration}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Estimated Total</span>
                    <span className="font-bold text-primary">₹{selectedServiceData.basePrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Final pricing will be confirmed by the CA based on your specific requirements.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Security Note */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Secure & Protected</h4>
                    <p className="text-xs text-muted-foreground">
                      Your information is encrypted and secure. Payment is held in escrow until service completion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">What happens next?</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• CA will review your request</li>
                      <li>• You'll receive a detailed proposal</li>
                      <li>• Confirm and make payment</li>
                      <li>• Work begins immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}