import { useState, useEffect } from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import BackendUnavailable from "../components/BackendUnavailable";
import { BACKEND_AVAILABLE } from "../config/backend";

const Faqs = () => {
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(BACKEND_AVAILABLE);

    useEffect(() => {
        if (!BACKEND_AVAILABLE) return;

        const fetchFaqs = async () => {
            setLoading(true);
            try {
                const baseUrl = import.meta.env.VITE_URL_BASE_BACKEND;
                const res = await fetch(`${baseUrl}/api/faqs/`);
                if (res.ok) {
                    const data = await res.json();
                    let faqsArray = Array.isArray(data)
                        ? data
                        : Array.isArray(data.results)
                            ? data.results
                            : [];
                    setFaqs(faqsArray);
                } else {
                    setError("Could not load frequently asked questions.");
                }
            } catch {
                setError("Network or server error.");
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0033]/90 via-[#a259ff]/80 to-[#c299fc]/90 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative">
            <a 
                href="/" 
                className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 text-fuchsia-300 hover:text-fuchsia-500 transition-colors flex items-center group"
            >
                <FaArrowLeft className="size-5 sm:size-6 md:size-7" />
                <span className="ml-2 font-bold text-sm sm:text-base md:text-lg group-hover:underline">
                    Back to Home
                </span>
            </a>
            
            <div className="w-full max-w-2xl mx-auto bg-black/70 backdrop-blur-md rounded-2xl border border-fuchsia-400/40 shadow-2xl p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fuchsia-300 mb-2 sm:mb-3 drop-shadow-neon">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-indigo-200 text-sm sm:text-base">
                        Find answers to the most common questions
                    </p>
                </div>

                {!BACKEND_AVAILABLE ? (
                    <BackendUnavailable />
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-500/20 border border-red-400/40 text-red-300 px-4 py-3 rounded-lg mb-4 text-center text-sm sm:text-base">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-fuchsia-400 mb-4"></div>
                                <p className="text-fuchsia-300 text-sm sm:text-base">Loading FAQs...</p>
                            </div>
                        ) : (
                            <ul className="space-y-3 sm:space-y-4">
                                {Array.isArray(faqs) && faqs.length > 0 ? (
                                    faqs.map((faq, idx) => (
                                        <li 
                                            key={idx} 
                                            className="bg-white/5 backdrop-blur-sm rounded-xl border border-fuchsia-400/20 hover:border-fuchsia-400/40 transition-all duration-300"
                                        >
                                            <button
                                                className="w-full text-left flex items-center justify-between p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 rounded-xl"
                                                onClick={() => handleToggle(idx)}
                                                aria-expanded={openIndex === idx}
                                            >
                                                <span className="text-base sm:text-lg md:text-xl font-semibold text-fuchsia-200 pr-4">
                                                    {faq.question}
                                                </span>
                                                <FaChevronRight 
                                                    className={`flex-shrink-0 transition-transform duration-300 size-5 sm:size-6 ${
                                                        openIndex === idx 
                                                            ? 'rotate-90 text-fuchsia-400 scale-110' 
                                                            : 'text-indigo-300'
                                                    }`}
                                                />
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                    openIndex === idx 
                                                        ? 'max-h-96 opacity-100' 
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                                                    <div className="bg-black/30 rounded-lg p-4">
                                                        <p className="text-indigo-100 text-sm sm:text-base md:text-lg leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    !loading && (
                                        <li className="text-center py-8 sm:py-12">
                                            <div className="bg-white/10 rounded-xl p-6 sm:p-8 border border-fuchsia-400/20">
                                                <p className="text-indigo-200 text-lg sm:text-xl font-semibold mb-2">
                                                    No FAQs available
                                                </p>
                                                <p className="text-indigo-300 text-sm sm:text-base">
                                                    Please try again later
                                                </p>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}

                        {!loading && faqs.length > 0 && (
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-fuchsia-400/20">
                                <p className="text-indigo-300 text-xs sm:text-sm text-center">
                                    Can't find what you're looking for?{" "}
                                    <a 
                                        href="/contact" 
                                        className="text-fuchsia-300 hover:text-fuchsia-400 underline transition-colors"
                                    >
                                        Contact me directly
                                    </a>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {BACKEND_AVAILABLE && (
                <div className="lg:hidden mt-6 text-center">
                    <p className="text-white/70 text-xs sm:text-sm">
                        Tap the questions to see the answers
                    </p>
                </div>
            )}
        </section>
    );
};

export default Faqs;
