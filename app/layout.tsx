// These styles apply to every route in the application
import "@/styles/globals.css";
import { Inter, Eczar } from "@next/font/google";
import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
const inter = Inter({
  variable: "--font-inter",
});

const eczar = Eczar({
  subsets: ["latin"],
  variable: "--font-eczar",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AuthStatusDiv = await AuthStatus();
  return (
    <html lang="en" className={eczar.variable}>
      <body className={inter.variable}>
        <Toaster />
        {/* {AuthStatusDiv} */}
        {children}
      </body>
    </html>
  );
}
