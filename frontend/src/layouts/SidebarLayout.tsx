import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function SidebarLayout({ children }: { children: React.ReactNode }) {

    console.log(' :>> ',);
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default SidebarLayout
