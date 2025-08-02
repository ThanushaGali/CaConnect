export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'ca';
  avatar?: string;
}

export interface CA {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  experience: number;
  domains: string[];
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  services: Service[];
  pricing: {
    hourlyRate: number;
    consultationFee: number;
  };
  availability: 'available' | 'busy' | 'unavailable';
  completedProjects: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: string;
  category: string;
}

export interface Retainer {
  id: string;
  clientId: string;
  caId: string;
  caName: string;
  serviceName: string;
  status: 'pending' | 'ongoing' | 'completed' | 'paid';
  amount: number;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface Earning {
  id: string;
  clientName: string;
  serviceName: string;
  amount: number;
  status: 'received' | 'pending';
  date: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
}