import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer className="bg-black opacoty-80 border-t border-base-content/10 text-white">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
               <div className="logo-container">
        {/* Inline SVG of your logo */}
        <svg viewBox="0 0 700.000000 700.000000" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          {/* SVG paths */}
          <path d="app/favicon_package_v0.16/safari-pinned-tab.svg" fill="url(#gradient)" />
        </svg>

        <style jsx>{`
          @keyframes animatedgradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .logo-container svg {
            height: 24px;
            width: 24px;
          }

          .logo-container svg #gradient {
            animation: animatedgradient 6s ease infinite alternate;
            background-size: 300% 300%;
          }
        `}</style>

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#f79533", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#ef4e7b", stopOpacity: 1}} />
            {/* Add more color stops as needed */}
          </linearGradient>
        </defs>
      </div>

              <strong className="font-extrabold tracking-tight text-base md:text-lg">
                {config.appName}
              </strong>
            </Link>

            <p className="mt-3 text-sm text-white">{config.appDescription}</p>
            <p className="mt-3 text-sm text-white">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {config.mailgun.supportEmail && (
                  <a
                    href={`mailto:${config.mailgun.supportEmail}`}
                    target="_blank"
                    className="link link-hover"
                    aria-label="Contact Support"
                  >
                    Support
                  </a>
                )}
                <Link href="/#pricing" className="link link-hover">
                  Pricing
                </Link>
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/tos" className="link link-hover">
                  Terms of services
                </Link>
                <Link href="/privacy-policy" className="link link-hover">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
