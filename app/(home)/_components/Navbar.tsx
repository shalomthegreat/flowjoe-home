"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-0">
      <div className="font-display text-3xl md:text-[42px] font-semibold text-espresso">
        flowjoe ☕
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-20 left-4 right-4 md:top-auto md:left-auto md:right-auto bg-cream-soft md:bg-transparent border md:border-0 border-latte rounded-lg md:rounded-none p-4 md:p-0 gap-4 md:gap-8 text-[15px] z-50 shadow-soft md:shadow-none`}>
        <span className="cursor-pointer hover:text-cinnamon transition-colors">Product</span>
        <span className="cursor-pointer hover:text-cinnamon transition-colors">Use Cases</span>
        <span className="cursor-pointer hover:text-cinnamon transition-colors">Resources</span>
        <span className="cursor-pointer hover:text-cinnamon transition-colors">Pricing</span>
      </div>
      <a href="#" className="hidden md:inline-block px-6 py-3 rounded-sm bg-espresso text-white font-medium border border-espresso">
        Download
      </a>
    </nav>
  );
}
