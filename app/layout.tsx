import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
// import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/provider/user-provider";
import ThemeProvider from "@/provider/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap", // 'swap' ensures text is visible while loading
  variable: "--font-playfair-display", // Optional: for use with CSS variables
});

export const metadata: Metadata = {
  title: "Ruthies Africa",
  description: "We style, You slay!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.className = theme;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <UserProvider>
        <ThemeProvider>
          <body
            className={`${playfair.variable} antialiased`}
            // className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
          >
            {children}
            <Toaster position={"top-right"} />
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}
