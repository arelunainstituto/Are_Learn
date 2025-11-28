import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationProvider, TopNav } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Sistema de gestão de inventário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <NavigationProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Main content area without sidebar - full width */}
            <div className="flex flex-col min-h-screen">
              <TopNav />
              <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50">
                <div className="max-w-7xl mx-auto w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}