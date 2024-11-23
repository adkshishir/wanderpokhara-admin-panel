'use client';

import { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Home,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { deleteAllCookies, deleteCookie } from '@/lib/cookie-handler';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export function AdminPanel({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCurrentPath, setIsCurrentPath] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  function checkPath(path: string, url: string) {
    //  check if the current path include the url exclude /admin
    if (url === path) {
      return true;
    }
    if (url.includes(path) && path !== '/admin') {
      return true;
    }
    return false;
  }
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className='flex items-center justify-between h-16 border-b px-6'>
          <Link href={'/'} className='text-2xl font-bold'>
            <h1 className='text-xl font-semibold'>Fly pokhara</h1>
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='lg:hidden'
            onClick={() => setSidebarOpen(false)}>
            <X className='h-6 w-6' />
            <span className='sr-only'>Close sidebar</span>
          </Button>
        </div>
        <nav className='mt-6'>
          {navs.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${
                checkPath(item.href, pathname) ? 'bg-gray-200' : ''
              }`}>
              <item.icon className='w-5 h-5 mr-3' />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className='flex-1 flex flex-col '>
        {/* Header */}
        <header className='flex items-center justify-between px-6 py-4 bg-white border-b'>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle sidebar</span>
            </Button>
            <h2 className='text-xl font-semibold ml-2'>Dashboard</h2>
          </div>
          <div className='flex items-center'>
            <Button variant='ghost' size='icon'>
              <Bell className='h-5 w-5' />
              <span className='sr-only'>Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>John Doe</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await deleteCookie('access_token');
                    await deleteCookie('role');
                    toast.success('Logged out successfully');
                    setTimeout(() => {
                      window.location.href = '/';
                    }, 1000);
                  }}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className='flex-1 max-h-[90vh] overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
}

const navs = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    name: 'Site Settings',
    href: '/admin/site-informations',
    icon: Settings,
  },
  // {
  //   name: 'Nav Links',
  //   href: '/admin/nav-links',
  //   icon: Home,
  // },
  {
    name: 'Posts',
    href: '/admin/post',
    icon: Home,
  },
  {
    name: 'Category',
    href: '/admin/category',
    icon: Home,
  },
  // {
  //   name: 'Reviews',
  //   href: '/admin/reviews',
  //   icon: Home,
  // },
  // { name: 'Packages', href: '/admin/packages', icon: Home },
  // { name: 'Blogs', href: '/admin/blogs', icon: Home },
  // {
  //   name: 'Teams',
  //   href: '/admin/teams',
  //   icon: Users,
  // },
  // {
  //   name: 'Mails',
  //   href: '/admin/mails',
  //   icon: Home,
  // },
  // {
  //   name: 'Gallery',
  //   href: '/admin/gallery',
  //   icon: Home,
  // },
  // {
  //   name: 'Bookings',
  //   href: '/admin/bookings',
  //   icon: Home,
  // }
];
