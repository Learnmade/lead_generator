import "./globals.css";
import { Providers } from "@/components/Providers";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learnmades - AI B2B Automation",
  description: "Automate your sales pipeline with Learnmades AI-driven lead discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={clsx(inter.className, "h-full antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
