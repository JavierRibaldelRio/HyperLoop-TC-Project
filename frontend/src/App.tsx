import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import SidebarLayout from "./layouts/SidebarLayout";

import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
