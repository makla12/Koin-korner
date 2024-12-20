import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const apesTitle = localFont({
  src: "./fonts/ApesTitle-11D0.ttf",
  variable: "--font-apes-title",
  weight: "100 900",
});

export const metadata = {
  title: "Koin Korner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        id="all"
        className={`${geistSans.variable} ${geistMono.variable} ${apesTitle.variable} antialiased bg-[#f3f3f3] dark:bg-[#18181b] text-black dark:text-white dark min-h-[100vh]`}
      >
        {children}
      </body>
    </html>
  );
}
