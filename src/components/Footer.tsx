
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const socials = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/",
  },
];

const Footer = () => (
  <footer className="bg-black text-beige py-8 mt-16 shadow-inner animate-fade-in">
    <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col items-center md:items-start">
        <span className="font-jakarta font-bold text-xl tracking-tight mb-2">MANSCARA</span>
        <span className="text-sm opacity-80">© {new Date().getFullYear()} Manscara · Crafted for confidence.</span>
      </div>
      <div className="flex gap-5 mt-3 md:mt-0">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              href={social.href}
              key={social.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="rounded-full p-2 bg-beige text-black hover:bg-sand hover:text-black hover:scale-110 transition-all shadow-card"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  </footer>
);

export default Footer;
