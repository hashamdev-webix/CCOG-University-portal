import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-input bg-accent flex items-center justify-center">
                <FaGraduationCap size={14} className="text-white" />
              </div>
              <span className="font-black text-xl">CCOG</span>
            </div>
            <p className="text-sm opacity-80 max-w-xs leading-relaxed" style={{ color: "white" }}>
              Your gateway to quality education. Apply, track, and manage your college admission journey seamlessly.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/courses" className="hover:opacity-100 transition-opacity">Courses</Link></li>
              <li><Link to="/admissions" className="hover:opacity-100 transition-opacity">Admissions</Link></li>
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/register" className="hover:opacity-100 transition-opacity">Apply Now</Link></li>
              <li><Link to="/login" className="hover:opacity-100 transition-opacity">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2"><FaEnvelope size={12} /> info@ccog.edu</li>
              <li className="flex items-center gap-2"><FaPhone size={12} /> +1 (647) 382-9104</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt size={12} /> Toronto, Canada</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs sm:text-sm opacity-60">
          © 2025 CCOG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
