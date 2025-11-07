import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import Tips from "./pages/Tips";
import Footer from "./pages/miniComponents/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        {/* <ModeToggle /> */}
        <Routes>
          <Route path="/" element={<Home />} />
<Route path="/project/:id" element={<ProjectView />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
        {/* <Footer /> */}
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
