"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { SiTiktok } from "react-icons/si";

import Image from "next/image";
import Link from "next/link";


const categories = ["Runners", "Sneakers", "Basketball", "Outdoor", "Golf", "Hiking"];
const company = ["About", "Contact", "Blogs"];

export default function AppFooter() {
  return (
    <footer className="w-full">
      {/* Newsletter Banner */}
      <div className="bg-[#4A69E2] rounded-2xl rounded-b-none px-8 py-16 mb-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-10">
          {/* Left: Text + Form */}
          <div className="flex-1">
            <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-extrabold uppercase leading-tight mb-2">
              Join our KicksPlus <br /> Club &amp; get 15% off
            </h2>
            <p className="text-white/80 text-xl font-semibold mb-4">
              Sign up for free! Join the community.
            </p>
            <div className="flex items-center gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Email address"
                className="text-black border placeholder:text-gray-400 rounded-md h-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="bg-black hover:bg-black/80 text-white uppercase text-xs font-medium tracking-widest px-4 h-9 rounded-md shrink-0">
                Submit
              </Button>
            </div>
          </div>

          {/* Right: KICKS logo */}
          <div className="shrink-0 md:pr-40 pr-0">
            <span className="text-white font-extrabold text-6xl md:text-7xl uppercase tracking-tight relative">
              <Link href="/" className="flex items-center">
          <Image
            src="/images/kick_white_logo.png"
            alt="Kicks Logo"
            width={351}
            height={88}
          />
        </Link>
              <span className="absolute -top-4 -right-6 w-7 h-7 bg-orange-400 rounded-full text-[12px] flex items-center justify-center text-gray-500 font-bold">
                +
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#1a1a1a] rounded-[48px] px-8 pt-10 pb-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div className="md:col-span-1">
            <h3 className="text-[#FFA52F] font-semibold text-2xl mb-3">About us</h3>
            <p className="text-[#E7E7E3] text-xl font-semibold">
              We are the biggest hyperstore in the universe. We got you all cover with our exclusive
              collections and latest drops.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#FFA52F] font-semibold text-2xl mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item}>
                       <p className="text-[#E7E7E3] text-xl font-semibold">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#FFA52F] font-semibold text-2xl mb-3">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <p className="text-[#E7E7E3] text-xl font-semibold">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-[#FFA52F] font-semibold text-2xl mb-3">Follow us</h3>
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook size={18} />, href: "#" },
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <SiTiktok />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                 className="text-[#E7E7E3] text-xl font-semibold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big KICKS watermark text */}
        <div className="overflow-hidden">
         <Image
                 src="/images/footerLogo.png"
                 alt="kicks footer logo"
                 width={1320}
                 height={500}
                 priority
               />
        </div>

        {/* Copyright */}
      </div>
        <div className="text-center bg-[#E7E7E3]  py-3 md:py-4 xl:py-4.5">
          <p className="text-black text-[16px]">© All rights reserved</p>
        </div>
    </footer>
  );
}