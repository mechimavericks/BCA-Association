import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "BCA Association | Home",
  description:
    "Welcome to the official page for BCA association : MMC, where you can find different knowledge about BCA and things.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NextTopLoader showSpinner={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
