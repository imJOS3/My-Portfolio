import { FaHome, FaProjectDiagram, FaLaptopCode, FaCertificate, FaInfoCircle, FaEnvelope } from "react-icons/fa";


export interface Section {
  id: string;
  label: string;
  icon: JSX.Element;
}

export const sections: Section[] = [
  { id: "home", label: "Home", icon: <FaHome size={22} /> },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram size={22} /> },
  { id: "about", label: "About", icon: <FaInfoCircle size={22} /> },
  { id: "skills", label: "Skills", icon: <FaLaptopCode size={22} /> },
  { id: "certificates", label: "Certificates", icon: <FaCertificate size={22} /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope size={22} /> },
];