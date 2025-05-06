import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-100 p-4 border-r">
                <Card className={`mb-2 ${location.pathname === "/" ? "bg-gray-200" : ""}`}>
                    <Link to="/">Home</Link>
                </Card>
                <Card className={`mb-2 ${location.pathname === "/about" ? "bg-gray-200" : ""}`}>
                    <Link to="/about">About</Link>
                </Card>
                <Card className={`mb-2 ${location.pathname === "/dashboard" ? "bg-gray-200" : ""}`}>
                    <Link to="/dashboard">Dashboard</Link>
                </Card>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
    );
};

export default SidebarLayout;
