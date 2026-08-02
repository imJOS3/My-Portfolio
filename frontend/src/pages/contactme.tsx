import { useState } from "react";
import {
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaTag,
    FaCommentDots,
    FaPaperPlane,
    FaMapMarkerAlt,
} from "react-icons/fa";
import BackendUnavailable from "../components/BackendUnavailable";
import { BACKEND_AVAILABLE } from "../config/backend";

const ContactForm = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!BACKEND_AVAILABLE) return;

        setLoading(true);
        setEnviado(false);
        setError("");

        const baseUrl = import.meta.env.VITE_URL_BASE_BACKEND;
        if (!baseUrl) {
            setError("Configuration error: VITE_URL_BASE_BACKEND is not defined.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${baseUrl}/api/contact/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setEnviado(true);
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setError("Could not send the message. Please try again later.");
            }
        } catch {
            setError("Network or server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-dvh overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#5b1f9e] to-[#a259ff] px-3 sm:px-6 py-3 sm:py-6 relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>

            <a
                href="/"
                className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 text-fuchsia-200 hover:text-white transition-colors flex items-center gap-1.5 group"
            >
                <FaArrowLeft size={14} className="sm:size-4" />
                <span className="font-semibold text-xs sm:text-sm group-hover:underline">
                    Back
                </span>
            </a>

            <div className="w-full max-w-4xl max-h-full bg-black/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-fuchsia-400/30 shadow-2xl grid grid-cols-1 lg:grid-cols-5 overflow-hidden">

                <div className="hidden lg:flex lg:col-span-2 flex-col justify-between bg-gradient-to-br from-fuchsia-700/30 via-purple-800/30 to-transparent p-8 border-r border-fuchsia-400/20 relative overflow-hidden">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-2xl"></div>

                    <div className="relative">
                        <span className="text-xs font-semibold tracking-widest text-fuchsia-300 uppercase">
                            Contact
                        </span>
                        <h1 className="text-3xl font-bold text-white mt-2 mb-3 leading-tight drop-shadow-neon">
                            Let's build something great together
                        </h1>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Tell me about an internship opportunity, project idea, or
                            proposal. I read every message and reply as soon as I can.
                        </p>
                    </div>

                    <div className="relative space-y-3">
                        <a
                            href="mailto:josebenjuema2005@gmail.com"
                            className="flex items-center gap-3 text-indigo-100 hover:text-fuchsia-300 transition-colors text-sm"
                        >
                            <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                                <FaEnvelope className="text-fuchsia-300" size={13} />
                            </span>
                            josebenjuema2005@gmail.com
                        </a>
                        <div className="flex items-center gap-3 text-indigo-100 text-sm">
                            <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                                <FaMapMarkerAlt className="text-fuchsia-300" size={13} />
                            </span>
                            Bogotá D.C, Colombia
                        </div>
                    </div>
                </div>

                {!BACKEND_AVAILABLE ? (
                    <div className="lg:col-span-3 flex flex-col justify-center gap-4 p-4 sm:p-6 md:p-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-fuchsia-300 drop-shadow-neon">
                                Send me a message
                            </h2>
                        </div>
                        <BackendUnavailable />
                        <p className="text-indigo-300 text-xs sm:text-sm text-center lg:text-left">
                            You can also write to{" "}
                            <a
                                href="mailto:josebenjuema2005@gmail.com"
                                className="text-fuchsia-300 hover:text-fuchsia-400 underline transition-colors"
                            >
                                josebenjuema2005@gmail.com
                            </a>
                        </p>
                    </div>
                ) : (
                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-3 flex flex-col gap-2.5 sm:gap-3 p-4 sm:p-6 md:p-8 overflow-y-auto"
                >
                    <div className="mb-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-fuchsia-300 drop-shadow-neon">
                            Send me a message
                        </h2>
                        <p className="text-indigo-300 text-xs sm:text-sm mt-0.5">
                            All fields are required
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        <div>
                            <label htmlFor="name" className="block text-fuchsia-200 font-semibold mb-1 text-xs sm:text-sm">
                                Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400/70" size={13} />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    placeholder="Your name"
                                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-lg bg-indigo-900/50 text-white border border-fuchsia-400/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-indigo-300/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-fuchsia-200 font-semibold mb-1 text-xs sm:text-sm">
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400/70" size={13} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    placeholder="you@email.com"
                                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-lg bg-indigo-900/50 text-white border border-fuchsia-400/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-indigo-300/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-fuchsia-200 font-semibold mb-1 text-xs sm:text-sm">
                            Subject
                        </label>
                        <div className="relative">
                            <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400/70" size={13} />
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder="Reason for your message"
                                className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-lg bg-indigo-900/50 text-white border border-fuchsia-400/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-indigo-300/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-fuchsia-200 font-semibold mb-1 text-xs sm:text-sm">
                            Message
                        </label>
                        <div className="relative">
                            <FaCommentDots className="absolute left-3 top-3 text-fuchsia-400/70" size={13} />
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={3}
                                autoComplete="off"
                                placeholder="Describe the internship, project, or proposal..."
                                className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-lg bg-indigo-900/50 text-white border border-fuchsia-400/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200 resize-none text-sm placeholder:text-indigo-300/50"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 px-6 py-2.5 sm:py-3 bg-fuchsia-500 hover:bg-fuchsia-600 hover:scale-[1.02] disabled:bg-fuchsia-400 disabled:cursor-not-allowed disabled:scale-100 text-white font-bold rounded-lg shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <FaPaperPlane size={13} />
                            </>
                        )}
                    </button>

                    <div className="min-h-[2rem]">
                        {enviado && (
                            <div className="bg-green-500/20 border border-green-400/40 text-green-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm text-center">
                                Message sent! I'll get back to you soon.
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500/20 border border-red-400/40 text-red-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    <p className="hidden sm:block text-indigo-300 text-xs text-center lg:text-left">
                        You can also write to{" "}
                        <a
                            href="mailto:josebenjuema2005@gmail.com"
                            className="text-fuchsia-300 hover:text-fuchsia-400 underline transition-colors"
                        >
                            josebenjuema2005@gmail.com
                        </a>
                    </p>
                </form>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
