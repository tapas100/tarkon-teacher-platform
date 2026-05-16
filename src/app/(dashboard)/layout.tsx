"use client";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";
import AIPanel from "@/components/layout/AIPanel";
import AIBottomSheet from "@/components/layout/AIBottomSheet";
import FAB from "@/components/layout/FAB";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed, isAiPanelOpen, toggleAiPanel } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar showGreeting />
      <AIPanel />
      <AIBottomSheet />

      {/* Main content */}
      <main
        className={cn(
          "pt-16 pb-20 md:pb-6 transition-all duration-300",
          isSidebarCollapsed ? "md:ml-[72px]" : "md:ml-[260px]",
          isAiPanelOpen ? "md:mr-[320px]" : "md:mr-0"
        )}
      >
        {children}
      </main>

      {/* AI toggle (desktop) */}
      <button
        onClick={toggleAiPanel}
        className={cn(
          "hidden md:flex fixed right-4 bottom-6 w-12 h-12 rounded-full items-center justify-center",
          "gradient-purple text-white shadow-ai hover:opacity-90 active:scale-95 transition-all z-30",
          isAiPanelOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Sparkles size={20} />
      </button>

      <FAB />
      <BottomNav />
    </div>
  );
}
