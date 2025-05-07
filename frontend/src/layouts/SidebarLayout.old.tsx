import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Home, Info, LayoutDashboard, Menu, type LucideIcon } from "lucide-react";
import { useState } from "react";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
];

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen">
            <aside
                className={`bg-black text-white p-4 border-r hidden md:flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 hover:bg-gray-800 rounded"
                    >
                        <Menu size={20} />
                    </button>
                </div>
                <nav className="flex-1">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            name={item.name}
                            path={item.path}
                            icon={item.icon}
                            isActive={location.pathname === item.path}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
    );
};

type SidebarItemProps = {
    name: string;
    path: string;
    icon: LucideIcon;
    isActive: boolean;
    collapsed: boolean;
};

const SidebarItem = ({
    name,
    path,
    icon: Icon,
    isActive,
    collapsed,
}: SidebarItemProps) => (
    <Card
        className={`flex items-center mb-2 px-3 py-3 space-x-3 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-gray-800 ${isActive ? "bg-gray-800 font-semibold shadow-sm" : ""
            }`}
    >
        <Icon size={20} />
        {!collapsed && (
            <Link to={path} className="flex-1 text-white">
                {name}
            </Link>
        )}
    </Card>
);

export default SidebarLayout;
