import { CircleGauge, ChartBar, Circle } from "lucide-react"
import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: CircleGauge,
    },
    {
        title: "Charts",
        url: "/charts",
        icon: ChartBar,
    },
    {
        title: "Record",
        url: "/record",
        icon: Circle,
    }
]

export function AppSidebar() {

    // Stores whether the bar is collapsed or not
    const { state } = useSidebar();


    let hLLogo;

    if (state === "collapsed") {

        hLLogo =

            <img
                style={{ "marginLeft": "-15px" }}
                src="Logo-HL.svg"
                alt="Logo HyperLoop UPV"
                className=" object-contain scale-50"
            />

    }
    else {

        hLLogo = <img
            src="Logo-HL.svg"
            alt="Logo HyperLoop UPV"
            className="object-contain w-auto h-12"
        />

    }

    return (
        <Sidebar collapsible="icon"  >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div style={{ "backgroundColor": "#171717" }} className="flex aspect-square size-12 items-center justify-center rounded-lg 
                                 ">

                                    {hLLogo}

                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Banca de Levitación</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>

                                        <Link to={item.url}>

                                            <>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </>
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <ModeToggle />
            </SidebarFooter>
        </Sidebar>
    )
}
