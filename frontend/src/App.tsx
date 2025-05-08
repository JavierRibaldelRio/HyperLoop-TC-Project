import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import SidebarLayout from "./layouts/SidebarLayout";

import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Record from "./pages/Record";
import About from "./pages/About";
import Error404 from "./pages/Error404";

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
            <Route path="/about" element={<About />} />

            {/* 404 Error Page */}
            <Route path="*" element={<Error404 />} />

          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
