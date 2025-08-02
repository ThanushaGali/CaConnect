import { CA, Service, Retainer, Notification, Earning, Reminder } from "@/types";

export const mockCAs: CA[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    experience: 8,
    domains: ["GST", "ITR", "Corporate Tax"],
    rating: 4.8,
    reviewCount: 124,
    location: "Mumbai, Maharashtra",
    description: "Experienced CA specializing in GST compliance and corporate taxation with 8+ years of expertise.",
    services: [
      {
        id: "s1",
        name: "GST Registration",
        description: "Complete GST registration and setup",
        basePrice: 5000,
        duration: "3-5 business days",
        category: "GST"
      },
      {
        id: "s2",
        name: "ITR Filing",
        description: "Individual tax return filing",
        basePrice: 2500,
        duration: "1-2 business days",
        category: "Income Tax"
      }
    ],
    pricing: {
      hourlyRate: 1500,
      consultationFee: 500
    },
    availability: "available",
    completedProjects: 245
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5af?w=150&h=150&fit=crop&crop=face",
    experience: 12,
    domains: ["Audit", "Company Law", "FEMA"],
    rating: 4.9,
    reviewCount: 189,
    location: "Delhi, NCR",
    description: "Senior CA with expertise in statutory audits and corporate compliance matters.",
    services: [
      {
        id: "s3",
        name: "Statutory Audit",
        description: "Complete statutory audit services",
        basePrice: 25000,
        duration: "15-20 business days",
        category: "Audit"
      },
      {
        id: "s4",
        name: "Company Incorporation",
        description: "Private limited company registration",
        basePrice: 15000,
        duration: "7-10 business days",
        category: "Company Law"
      }
    ],
    pricing: {
      hourlyRate: 2000,
      consultationFee: 800
    },
    availability: "available",
    completedProjects: 312
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    experience: 5,
    domains: ["GST", "TDS", "Bookkeeping"],
    rating: 4.6,
    reviewCount: 67,
    location: "Bangalore, Karnataka",
    description: "Young and dynamic CA focusing on small business compliance and bookkeeping.",
    services: [
      {
        id: "s5",
        name: "Monthly Bookkeeping",
        description: "Complete bookkeeping and accounts maintenance",
        basePrice: 8000,
        duration: "Monthly",
        category: "Bookkeeping"
      }
    ],
    pricing: {
      hourlyRate: 1200,
      consultationFee: 400
    },
    availability: "busy",
    completedProjects: 89
  }
];

export const mockRetainers: Retainer[] = [
  {
    id: "r1",
    clientId: "client1",
    caId: "1",
    caName: "Rajesh Kumar",
    serviceName: "GST Registration",
    status: "ongoing",
    amount: 5000,
    startDate: "2024-01-15",
    description: "GST registration for new business entity"
  },
  {
    id: "r2",
    clientId: "client1",
    caId: "2",
    caName: "Priya Sharma",
    serviceName: "ITR Filing",
    status: "completed",
    amount: 2500,
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    description: "Individual tax return filing for FY 2022-23"
  },
  {
    id: "r3",
    clientId: "client1",
    caId: "1",
    caName: "Rajesh Kumar",
    serviceName: "Consultation",
    status: "pending",
    amount: 1500,
    startDate: "2024-01-20",
    description: "Tax planning consultation"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Service Completed",
    message: "Your ITR filing has been completed successfully",
    type: "success",
    isRead: false,
    createdAt: "2024-01-12"
  },
  {
    id: "n2",
    title: "Payment Due",
    message: "Payment pending for GST Registration service",
    type: "warning",
    isRead: false,
    createdAt: "2024-01-18"
  },
  {
    id: "n3",
    title: "New Message",
    message: "You have a new message from Rajesh Kumar",
    type: "info",
    isRead: true,
    createdAt: "2024-01-16"
  }
];

export const mockEarnings: Earning[] = [
  {
    id: "e1",
    clientName: "ABC Private Ltd",
    serviceName: "Statutory Audit",
    amount: 25000,
    status: "received",
    date: "2024-01-15"
  },
  {
    id: "e2",
    clientName: "XYZ Enterprises",
    serviceName: "GST Registration",
    amount: 5000,
    status: "pending",
    date: "2024-01-18"
  },
  {
    id: "e3",
    clientName: "John Doe",
    serviceName: "ITR Filing",
    amount: 2500,
    status: "received",
    date: "2024-01-10"
  }
];

export const mockReminders: Reminder[] = [
  {
    id: "rem1",
    title: "Submit TDS Return",
    description: "Quarterly TDS return submission due",
    dueDate: "2024-01-31",
    priority: "high",
    isCompleted: false
  },
  {
    id: "rem2",
    title: "Client Meeting",
    description: "Meeting with ABC Private Ltd for audit discussion",
    dueDate: "2024-01-25",
    priority: "medium",
    isCompleted: false
  },
  {
    id: "rem3",
    title: "Certificate Upload",
    description: "Upload completion certificate for XYZ project",
    dueDate: "2024-01-22",
    priority: "low",
    isCompleted: true
  }
];

export const domains = [
  "GST",
  "ITR",
  "Corporate Tax",
  "Audit",
  "Company Law",
  "FEMA",
  "TDS",
  "Bookkeeping",
  "Tax Planning",
  "Compliance"
];

export const locations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR", 
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Hyderabad, Telangana",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat"
];