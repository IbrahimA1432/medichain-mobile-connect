import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  Database, 
  CheckCircle,
  ArrowRight,
  Heart,
  Clock,
  Lock
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Smartphone,
      title: "NFC-Powered Access",
      description: "Instant medical record access through simple NFC tap - no internet required"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Patient data stays with the patient, ensuring complete privacy and security"
    },
    {
      icon: Database,
      title: "Optimized Storage",
      description: "Distributed storage system reduces server costs and improves data access speed"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant record loading and updates with NFC technology"
    },
    {
      icon: Users,
      title: "Dual Interface",
      description: "Seamless experience for both doctors and patients on the same platform"
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Medical records accessible 24/7, even in areas with poor connectivity"
    }
  ];

  const benefits = [
    "Reduce appointment wait times by 70%",
    "Eliminate paper-based record keeping",
    "Ensure data portability across healthcare providers",
    "Enable emergency medical access without internet",
    "Reduce healthcare IT infrastructure costs",
    "Improve patient data ownership and control"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MediChain
            </span>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          Revolutionary Healthcare Technology
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          The Future of Medical Records is in Your Pocket
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Transform healthcare with NFC-powered medical records. Instant access, 
          complete privacy, and seamless data portability for doctors and patients.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              Experience the Demo
              <Smartphone className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Demo Preview */}
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-gradient-card shadow-medical-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Dr. Sarah Wilson</p>
                <p className="text-sm text-muted-foreground">Cardiology Department</p>
              </div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Smartphone className="h-5 w-5 animate-pulse" />
                <span className="text-sm font-medium">Ready to scan NFC...</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Tap patient's NFC device to instantly load medical records
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose MediChain?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revolutionary technology that puts patients in control while empowering healthcare providers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-medical-md transition-all duration-300 border-primary/20">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Proven Results for Healthcare Providers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join the healthcare revolution and experience measurable improvements 
                in efficiency, security, and patient satisfaction.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <Lock className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Patient-Owned Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete data sovereignty with NFC storage
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <Zap className="h-8 w-8 text-accent" />
                  <div>
                    <h4 className="font-semibold">Instant Access</h4>
                    <p className="text-sm text-muted-foreground">
                      No waiting, no loading - immediate record access
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <Database className="h-8 w-8 text-warning" />
                  <div>
                    <h4 className="font-semibold">Cost Effective</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce IT infrastructure and storage costs
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the future of medical records today. Try our interactive demo 
            and see how NFC technology can revolutionize your practice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Start Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">MediChain</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Revolutionizing healthcare through NFC technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;