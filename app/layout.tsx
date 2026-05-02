import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "OAU Health Center | Digital Portal",
  description:
    "Official healthcare management portal for Obafemi Awolowo University Students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body
        style={{
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          width: "100%",
          maxWidth: "100vw",
          WebkitTextSizeAdjust: "100%",
        }}
        className="min-h-full flex flex-col"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}