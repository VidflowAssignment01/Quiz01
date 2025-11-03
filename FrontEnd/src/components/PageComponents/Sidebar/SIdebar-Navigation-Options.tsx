import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
export function SidebarNavOptions({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const { open } = useSidebar();
  const navigate = useNavigate();
  return (
    <SidebarGroup className="w-full">
      <SidebarMenu className="">
        {items.map((item, i) => (
          <SidebarMenuItem key={i} onClick={() => navigate(item.url)}>
            <SidebarMenuButton
              size="default"
              className={cn(
  "cursor-pointer gap-x-4 overflow-visible h-[40px] flex items-center rounded-lg transition-all duration-300",
  "bg-transparent",
  "glassy-hover",
  !open && "hover:bg-transparent active:bg-transparent p-0"
)}
            >
              {item.icon && (
                <div className="flex items-center size-7 justify-center">
                  <item.icon
                    className={cn(
                      "mx-auto size-6.5 text-foreground transition-colors duration-300",
                      "group-hover:text-foreground/80",
                      !open && "hover:text-gray-400"
                    )}
                  />
                </div>
              )}

              <span className="text-lg">{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
