// src/constants/navigation.ts
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Settings, 
  Box,
} from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
};

export const MENU_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    children: [
      { title: "Product List", href: "/ecommerce/products" },
      { title: "Order Management", href: "/ecommerce/orders" },
      { title: "Transactions", href: "/ecommerce/transactions" },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      { title: "All Users", href: "/users/all" },
      { title: "Roles & Permissions", href: "/users/roles" },
    ],
  },
  {
    title: "Components",
    icon: Box,
    children: [
      { title: "Data Tables", href: "/components/data-tables" },
      { title: "Forms & Inputs", href: "/components/forms-inputs" },
      { title: "Modals & Overlays", href: "/components/overlays" },
    ],
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/settings",
  },
];