import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import SidebarLayout from "./layouts/SidebarLayout";

import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Record from "./pages/Record";

function App() {
  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/record" element={<Record />} />
            {/* Add more routes as needed */}
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
