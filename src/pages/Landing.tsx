import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { 
  Users, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Award,
  Globe
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "Verified CAs",
      description: "Connect with certified and experienced Chartered Accountants"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and transactions are protected with enterprise-grade security"
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Get your work done faster with streamlined processes"
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "All CAs are rated and reviewed by real clients"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified CAs" },
    { number: "10,000+", label: "Happy Clients" },
    { number: "50,000+", label: "Services Completed" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 animate-bounce-gentle">
            India's Leading CA Platform
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Connect with
            <span className="bg-gradient-hero bg-clip-text text-transparent animate-pulse-glow"> Expert CAs</span>
            <br />
            For Your Business
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in" style={{animationDelay: "0.2s"}}>
            Find qualified Chartered Accountants for GST, ITR, Audit, and more. 
            Get professional services with complete transparency and trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in" style={{animationDelay: "0.4s"}}>
            <Button size="xl" variant="premium" asChild className="hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Link to="/register?role=client">
                Find a CA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
              <Link to="/register?role=ca">
                Join as CA
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-300 animate-fade-in" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary-glow transition-colors">{stat.number}</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose CA Connect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find, hire, and work with the best Chartered Accountants in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 group animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow shadow-lg transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Get expert help with all your accounting and compliance needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "GST Registration & Filing", price: "₹5,000", icon: CheckCircle },
              { title: "ITR Filing", price: "₹2,500", icon: TrendingUp },
              { title: "Company Audit", price: "₹25,000", icon: Award },
              { title: "Company Registration", price: "₹15,000", icon: Globe },
              { title: "Bookkeeping", price: "₹8,000/month", icon: Users },
              { title: "Tax Planning", price: "₹1,500/hour", icon: Star }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-strong transition-all duration-300 border-0 bg-gradient-card hover:scale-105 group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-6 w-6 text-primary mr-3 group-hover:animate-bounce-gentle" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                    Professional service with guaranteed quality and timely delivery
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary group-hover:text-primary-glow transition-colors">Starting {service.price}</span>
                    <Button variant="outline" size="sm" asChild className="hover:scale-110 transition-transform">
                      <Link to="/client/browse">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="container mx-auto text-center relative animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-bounce-gentle">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-slide-in" style={{animationDelay: "0.2s"}}>
            Join thousands of satisfied clients and CAs on India's most trusted platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: "0.4s"}}>
            <Button size="xl" variant="secondary" asChild className="hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Link to="/register?role=client">Find a CA Now</Link>
            </Button>
            <Button size="xl" variant="gradient" asChild className="hover:shadow-glow transition-all duration-300 hover:scale-105">
              <Link to="/register?role=ca">Become a Partner CA</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}