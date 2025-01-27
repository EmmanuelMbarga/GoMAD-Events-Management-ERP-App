import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoMAD Event Manager",
  description:
    "Event Management App, a modern platform designed for seamless participant management at the upcoming 10th GoMAD Event.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        id="__next"
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
