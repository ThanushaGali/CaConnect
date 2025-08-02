import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: 'client' | 'ca';
    avatar?: string;
  } | null;
}

export function Layout({ children, user }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}