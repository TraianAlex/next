import type { Metadata } from 'next';
import SideNavigation from '@/app/components/SideNavigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen'>
      <SideNavigation />
      <div className='flex-1'>{children}</div>
    </div>
  );
}

