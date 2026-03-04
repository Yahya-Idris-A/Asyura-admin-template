import "@/styles/globals.css";
// import type { Metadata } from "next";
import { BottomNav } from "@/components/organisms/BottomNav";
import { MobileDrawer } from "@/components/organisms/MobileDrawer";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Header } from "@/components/organisms/Header";

// export const metadata: Metadata = {
//   title: "Asyura Admin Template",
//   description: "Enterprise-grade dashboard architecture",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground w-full">
      <div className="shrink-0 h-full hidden tablet:block z-30">
        <Sidebar />
      </div>

      {/* Wrapper untuk Header & Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 tablet:p-8 pb-20 tablet:pb-8">
          {children}
        </main>

        {/* Mobile Navigation Area (Otomatis hilang di Tablet/Desktop) */}
        <BottomNav />
        <MobileDrawer />
      </div>
    </div>
  );
}
