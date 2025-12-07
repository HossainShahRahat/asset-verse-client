import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100">Services</h6>
            <a className="link link-hover">Asset Tracking</a>
            <a className="link link-hover">HR Management</a>
            <a className="link link-hover">Employee Self-Service</a>
            <a className="link link-hover">Reporting</a>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100">Company</h6>
            <Link to="/" className="link link-hover">
              About us
            </Link>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100">Social</h6>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-2xl"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All right reserved by
            AssetVerse Industries Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
