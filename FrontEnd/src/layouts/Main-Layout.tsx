import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/PageComponents/Sidebar/AppSidebar'
import { Search } from 'lucide-react'

export default function MainLayout() {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-20 shrink-0 items-center justify-between px-6 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            VidFlow
          </h1>

          <div className="flex items-center w-full max-w-lg bg-gray-100 dark:bg-neutral-800 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>

          {!isMobile && (
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <SidebarTrigger className="text-gray-700 dark:text-gray-300" />
            </Button>
          )}
        </header>

        <main className="flex w-full container mx-auto px-5 py-6">
          <Outlet />
        </main>

        {isMobile && (
          <Button
            asChild
            size="icon"
            className="bg-accent-foreground/10 fixed right-5 bottom-6 h-12 w-12 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <SidebarTrigger className="text-foreground" />
          </Button>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
