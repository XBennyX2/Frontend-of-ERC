import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import {
  BarChart3,
  Box,
  Clipboard,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  Settings,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from "lucide-react";

interface SidebarProps {
  onCloseSidebar?: () => void;
}

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  allowedRoles?: UserRole[];
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const Sidebar = ({ onCloseSidebar }: SidebarProps) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Navigation sections with role-based access control
  const navSections: NavSection[] = [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          href: "/",
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          title: "Products",
          href: "/products",
          icon: <Package className="h-5 w-5" />,
        },
        {
          title: "Categories",
          href: "/categories",
          icon: <Box className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Inventory",
      items: [
        {
          title: "Stock",
          href: "/stock",
          icon: <ShoppingBag className="h-5 w-5" />,
        },
        {
          title: "Stock Transfers",
          href: "/stock-transfers",
          icon: <Truck className="h-5 w-5" />,
          allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
        },
        {
          title: "Low Stock Alerts",
          href: "/low-stock-alerts",
          icon: <Clipboard className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Store Management",
      items: [
        {
          title: "Stores",
          href: "/stores",
          icon: <Store className="h-5 w-5" />,
          allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
        },
        {
          title: "Cashiers",
          href: "/cashiers",
          icon: <Users className="h-5 w-5" />,
          allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
        },
      ],
    },
    {
      title: "Sales",
      items: [
        {
          title: "Receipts",
          href: "/receipts",
          icon: <Receipt className="h-5 w-5" />,
        },
        {
          title: "Orders",
          href: "/orders",
          icon: <ShoppingBag className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          title: "Transactions",
          href: "/transactions",
          icon: <CreditCard className="h-5 w-5" />,
        },
        {
          title: "Financial Records",
          href: "/financial-records",
          icon: <BarChart3 className="h-5 w-5" />,
          allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
        },
      ],
    },
  ];

  // Filter out items based on user role
  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !item.allowedRoles || (user && item.allowedRoles.includes(user.role))
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="flex h-full flex-col overflow-hidden border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold"
          onClick={onCloseSidebar}
        >
          <Home className="h-6 w-6" />
          <span className="text-lg font-semibold">BuildSync IMS</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          {filteredSections.map((section) => (
            <div key={section.title} className="mb-4">
              <h4 className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onCloseSidebar}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "mb-1 w-full justify-start",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-3">
        <Link
          to="/profile"
          onClick={onCloseSidebar}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-1 w-full justify-start",
            pathname === "/profile" && "bg-accent text-accent-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="ml-2">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-1 w-full justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
