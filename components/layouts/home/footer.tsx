import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 md:py-16">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[80%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Collections */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">COMPANY</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">LEGAL</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            {/* © {new Date().getFullYear()} Ruthie Africa. All rights reserved. */}
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-600 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-600 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-600 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-600 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
