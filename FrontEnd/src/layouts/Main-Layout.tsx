import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useIsMobile, useIsXL } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/PageComponents/Sidebar/AppSidebar';
import SearchBar from '@/components/PageComponents/SearchBar';

export default function MainLayout() {

  const isMobile = useIsMobile();
//   const isXL = useIsXL();

  // const 

  return (

    <SidebarProvider  className=''>
      {/* ----------------------------- */}
      <AppSidebar />

      {/* -----------------------------*/}
      <SidebarInset >

<header className="flex h-20 shrink-0 items-center justify-center gap-2  px-4">
          
          <SearchBar/>
        </header>
        <div className="flex w-[100%] container mx-auto px-5 ">
          <Outlet />
        </div>

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

  );
}
