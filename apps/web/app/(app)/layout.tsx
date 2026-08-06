'use client'

import { Sidebar } from "@/components/layout/Sidebar";
import { ChannelSidebar } from "@/components/layout/ChannelSidebar";
import { CreateGroupModal } from "@/components/modals/CreateGroupModal";
import { InviteModal } from "@/components/modals/InviteModal";
import { UploadModal } from "@/components/modals/UploadModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { SearchModal } from "@/components/modals/SearchModal";
import { ShopModal } from "@/components/modals/ShopModal";
import { GameModal } from "@/components/modals/GameModal";
import { FloatingAiAssistant } from "@/components/ai/FloatingAiAssistant";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showChannelSidebar = pathname.startsWith('/channels') || pathname === '/dashboard';

  return (
    <div className="flex h-screen w-full bg-[#0A0E1A] overflow-hidden text-white relative">
      {/* Primary Server / App Sidebar Rail */}
      <Sidebar />

      {/* Channel & Voice Room Secondary Panel */}
      {showChannelSidebar && <ChannelSidebar />}

      {/* Main Feature Content View */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 bg-[#0A0E1A]/50">
        {children}
      </main>

      {/* Global Interactive Modals */}
      <CreateGroupModal />
      <InviteModal />
      <UploadModal />
      <SettingsModal />
      <SearchModal />
      <ShopModal />
      <GameModal />
      
      {/* Global Floating AI Assistant */}
      <FloatingAiAssistant />
    </div>
  );
}
