import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// KaTeX's stylesheet, not its JavaScript. Math is rendered to React elements on
// the server (components/stem.tsx); the browser only needs the CSS and fonts.
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prerequisite check",
  description: "Find the earlier skill that is holding up the course you are taking now.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a2825",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate font-serif leading-relaxed text-chalk antialiased">
        <div className="mx-auto w-full max-w-lg px-5 pb-20 pt-7">{children}</div>
      </body>
    </html>
  );
}
