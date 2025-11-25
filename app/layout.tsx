import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Утилита из shadcn для объединения классов
import SmoothScroll from "@/components/smooth-scroll";

// Основной шрифт для текста
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // CSS-переменная для Tailwind
});

// Акцентный шрифт для заголовков
const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading", // CSS-переменная для Tailwind
});

export const metadata: Metadata = {
  title: "The Rigby Foundation",
  description: "Building open, secure, and decentralized tools for a private internet.",
  icons: {
    icon: "/logo.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Принудительно включаем темную тему */}
      <body
        // Добавляем переменные шрифтов в body и применяем основной шрифт по умолчанию
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
