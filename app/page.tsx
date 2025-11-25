"use client";


import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaGithub, FaShieldHalved, FaUnlock, FaShapes, FaDiscord, FaUsers, FaServer, FaDownload } from "react-icons/fa6";
import Logo from "@/public/logo.jpeg"
import Nugget from "@/public/nugget.png"
import RigbySplash from "@/public/rigbysplash.png"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-logo", 
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".hero-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(".hero-btns",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(".hero-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1"
      );

      // Mouse Parallax for Hero Glow
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 20;
        const y = (clientY - innerHeight / 2) / 20;
        
        gsap.to(".hero-glow", {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Principles Animations
      gsap.fromTo(".principle-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: principlesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects Animations
      gsap.fromTo(".project-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Community Animations
      gsap.fromTo(".community-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: communityRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 text-zinc-50 selection:bg-orange-500/30 overflow-x-hidden">
      
      <section ref={heroRef} className="w-full max-w-5xl px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center relative">
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        
        <div className="hero-logo">
          <Image src={Logo} alt="Rigby Foundation Logo" width={80} height={80} className="mb-8 rounded-2xl shadow-lg shadow-orange-500/20" />
        </div>
        
        <h1 className="hero-title font-heading text-5xl min-h-20 md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
          The Rigby Foundation
        </h1>
        <p className="hero-desc max-w-2xl text-xl text-zinc-400 mb-10 font-light leading-relaxed">
          Building open, secure, and decentralized tools for a private internet. We believe in code that protects users, not exploits them.
        </p>
        <div className="hero-btns flex gap-4">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 duration-300">
            <Link href="#projects">Our Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:text-orange-500 transition-transform hover:scale-105 active:scale-95 duration-300">
            <Link href="https://github.com/Rigby-Foundation" target="_blank" className="flex items-center gap-2">
              <FaGithub className="w-5 h-5" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      <Separator className="max-w-5xl bg-zinc-800" />

      <section id="principles" ref={principlesRef} className="w-full max-w-5xl px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="principle-card flex flex-col items-start p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/50 transition-colors duration-300">
          <FaUnlock className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-heading text-xl font-bold mb-2">100% Open Source</h3>
          <p className="text-zinc-400">Transparency is trust. Our code is open for audit by anyone. No hidden backdoors or proprietary black boxes.</p>
        </div>
        <div className="principle-card flex flex-col items-start p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/50 transition-colors duration-300">
          <FaShieldHalved className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-heading text-xl font-bold mb-2">Privacy First</h3>
          <p className="text-zinc-400">We build zero-knowledge architectures. Your data is encrypted by you, for you. We can't see it even if we wanted to.</p>
        </div>
        <div className="principle-card flex flex-col items-start p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/50 transition-colors duration-300">
          <FaShapes className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-heading text-xl font-bold mb-2">No Vendor Lock-in</h3>
          <p className="text-zinc-400">We use open standards. You are free to use our tools with other services, or host your own infrastructure.</p>
        </div>
      </section>

      <Separator className="max-w-5xl bg-zinc-800" />

      <section id="projects" ref={projectsRef} className="w-full max-w-5xl px-6 py-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* NuggetVPN Card */}
          <Card className="project-card bg-zinc-900/50 border-zinc-800 overflow-hidden relative group hover:border-orange-500/30 transition-colors duration-500">
            {/* Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-3">
                <Image src={Nugget} alt="NuggetVPN" width={32} height={32} className="rounded-md" />
                NuggetVPN
              </CardTitle>
              <CardDescription className="text-zinc-400 text-base">The flagship project.</CardDescription>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-2">
              <p>A modern, blazing fast, and secure VPN client built with Rust and Tauri.</p>
              <ul className="list-disc list-inside text-zinc-400 text-sm">
                <li>Supports VLESS Reality & Shadowsocks</li>
                <li>Zero-Knowledge config sync</li>
                <li>Native performance, tiny footprint</li>
              </ul>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 transition-transform hover:scale-105 active:scale-95 duration-300">
                <Link href="https://nugget.rigby-foundation.org">Website</Link>
              </Button>
               <Button asChild variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-transform hover:scale-105 active:scale-95 duration-300">
                <Link href="https://github.com/Rigby-Foundation/nuggetvpn">GitHub</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="project-card bg-zinc-900/50 border-zinc-800 overflow-hidden relative group hover:border-orange-500/30 transition-colors duration-500">
            {/* Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-3">
                <Image src={RigbySplash} alt="NuggetVPN" width={32} height={32} className="rounded-md" />
                RigbyHost
              </CardTitle>
              <CardDescription className="text-zinc-400 text-base">The best GDPS hosting platform.</CardDescription>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-2">
              <p>A GDPS hosting platform built fully with Typescript.</p>
              <ul className="list-disc list-inside text-zinc-400 text-sm">
                <li>Best panel experience</li>
                <li>Easy to use</li>
                <li>Fast and reliable</li>
                <li>Uses its own OSS core - NitroCore</li>
              </ul>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 transition-transform hover:scale-105 active:scale-95 duration-300">
                <Link href="https://rigby.host">Website</Link>
              </Button>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 transition-transform hover:scale-105 active:scale-95 duration-300">
                <Link href="https://github.com/RigbyHost/NitroCore">NitroCore</Link>
              </Button>
               <Button asChild variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-transform hover:scale-105 active:scale-95 duration-300">
                <Link href="https://github.com/RigbyHost">GitHub</Link>
              </Button>
            </CardFooter>
          </Card>

        </div>
      </section>

      <Separator className="max-w-5xl bg-zinc-800" />

      <section ref={communityRef} className="w-full max-w-5xl px-6 py-24 text-center">
        <div className="community-content flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Join the Community</h2>
          <p className="max-w-2xl text-zinc-400 mb-10 text-lg">
            We are building a movement for a free and open internet. Join our Discord to chat with developers, get support, and contribute to the future of privacy.
          </p>
          <Button asChild size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-transform hover:scale-105 active:scale-95 duration-300">
            <Link href="https://discord.gg/rigby" target="_blank" className="flex items-center gap-2">
              <FaDiscord className="w-5 h-5" />
              Join Discord
            </Link>
          </Button>
        </div>
      </section>

      <Separator className="max-w-5xl bg-zinc-800" />

      <section className="w-full max-w-3xl px-6 py-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-orange-500">Is NuggetVPN free?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Yes, the client is 100% free and open source. You can use it with any compatible server. We also plan to offer our own premium servers in the future for those who want a turnkey solution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-orange-500">How does RigbyHost work?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              RigbyHost provides a managed hosting environment for Geometry Dash Private Servers (GDPS). We handle the infrastructure, security, and updates so you can focus on your community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-orange-500">Can I contribute to the code?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Absolutely! All our projects are open source on GitHub. We welcome contributions of all kinds, from code fixes to documentation improvements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-orange-500">Do you collect any user data?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              No. We are privacy absolutists. Our apps are designed to be zero-knowledge. We don't track your activity, your IP, or your usage.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <footer className="w-full py-10 border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="Rigby Foundation" width={24} height={24} className="rounded-md grayscale opacity-50" />
            <span className="text-zinc-500 text-sm font-medium">The Rigby Foundation</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="https://github.com/Rigby-Foundation" className="hover:text-orange-500 transition-colors">GitHub</Link>
            <Link href="https://discord.gg/jC8MuXzeHc" className="hover:text-orange-500 transition-colors">Discord</Link>
          </div>
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} The Rigby Foundation. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}