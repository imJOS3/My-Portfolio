import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavProvider } from "./components/navbar/useNavState";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/NotFound";

const ContactmePage = lazy(() => import("./pages/contactme"));
const FaqPage = lazy(() => import("./pages/Faqs"));
const OpenPage = lazy(() => import("./pages/open"));
const ThemePage = lazy(() => import("./pages/Theme"));
const HomePage = lazy(() => import("./pages/Home"));

function App() {
    return (
        <ThemeProvider>
            <Router>
                <NavProvider>
                    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/contactme" element={<ContactmePage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/open" element={<OpenPage />} />
                            <Route path="/theme" element={<ThemePage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </NavProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;