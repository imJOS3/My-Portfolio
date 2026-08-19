import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavProvider } from "./components/navbar/useNavState";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/NotFound";

const FaqPage = lazy(() => import("./pages/Faqs"));
const OpenPage = lazy(() => import("./pages/open"));
const HobbyDetailPage = lazy(() => import("./pages/HobbyDetail"));
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
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/open" element={<OpenPage />} />
                            <Route path="/open/:hobbyId" element={<HobbyDetailPage />} />
                            <Route path="/open/:hobbyId/:itemId" element={<HobbyDetailPage />} />
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