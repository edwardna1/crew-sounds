// These styles apply to every route in the application
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
const inter = Inter({
  variable: "--font-inter",
});
import AuthContext from "./AuthContext";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AuthStatusDiv = await AuthStatus();
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthContext>
          <Toaster />
          {AuthStatusDiv}
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
