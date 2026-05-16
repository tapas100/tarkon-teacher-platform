"use client";
import { useState } from "react";
import { Sun, Moon, Bell, Lock, Globe, Palette, ChevronRight, User, Shield, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TEACHER } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SettingRowProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  badge?: string;
  toggle?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  danger?: boolean;
}

function SettingRow({ icon: Icon, label, description, badge, toggle, checked, onToggle, onClick, danger }: SettingRowProps) {
  return (
    <button
      onClick={onClick || onToggle}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-background transition-colors rounded-2xl text-left"
    >
      <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0",
        danger ? "bg-red-100" : "bg-background")}>
        <Icon size={18} className={danger ? "text-red-500" : "text-text-secondary"} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium text-body", danger ? "text-red-600" : "text-text-primary")}>{label}</p>
        {description && <p className="text-caption text-text-secondary">{description}</p>}
      </div>
      {badge && <Badge variant="blue">{badge}</Badge>}
      {toggle ? (
        <div
          className={cn("w-11 h-6 rounded-full transition-colors flex-shrink-0", checked ? "bg-primary" : "bg-slate-200")}
        >
          <div className={cn("w-5 h-5 rounded-full bg-white shadow-sm transition-transform m-0.5", checked ? "translate-x-5" : "translate-x-0")} />
        </div>
      ) : !toggle && !badge && (
        <ChevronRight size={16} className="text-text-secondary flex-shrink-0" />
      )}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { isDark, toggleDark } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-page-header font-bold text-text-primary mb-6">Settings</h1>

      {/* Profile card */}
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={TEACHER.name} size="xl" />
          <div className="flex-1">
            <p className="text-card-title font-bold text-text-primary">{TEACHER.name}</p>
            <p className="text-body text-text-secondary">{TEACHER.subject} Teacher</p>
            <p className="text-caption text-text-secondary">{TEACHER.school}</p>
            <Badge variant="blue" className="mt-1.5">{TEACHER.role}</Badge>
          </div>
          <Button size="sm" variant="secondary">Edit Profile</Button>
        </div>
      </div>

      {/* Settings sections */}
      <div className="space-y-4">
        {/* Appearance */}
        <div className="card p-2">
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Appearance</p>
          <SettingRow
            icon={isDark ? Moon : Sun}
            label="Dark Mode"
            description="Switch between light and dark theme"
            toggle
            checked={isDark}
            onToggle={toggleDark}
          />
          <SettingRow icon={Palette} label="Theme Color" description="Customise your accent colour" badge="New" />
        </div>

        {/* Notifications */}
        <div className="card p-2">
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Notifications</p>
          <SettingRow
            icon={Bell}
            label="Push Notifications"
            description="Alerts for student risks & messages"
            toggle checked={notifications} onToggle={() => setNotifications(!notifications)}
          />
          <SettingRow icon={Bell} label="Notification Priority" description="Configure critical / medium / low alerts" />
        </div>

        {/* Security */}
        <div className="card p-2">
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Security</p>
          <SettingRow
            icon={Lock}
            label="Biometric Login"
            description="Use fingerprint or face to sign in"
            toggle checked={biometric} onToggle={() => setBiometric(!biometric)}
          />
          <SettingRow icon={Shield} label="Role & Permissions" description="Teacher · Full classroom access" />
          <SettingRow icon={Lock} label="Change Password" />
        </div>

        {/* Preferences */}
        <div className="card p-2">
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Preferences</p>
          <SettingRow icon={Globe} label="Language" description="English" />
          <SettingRow icon={User} label="Account Details" />
        </div>

        {/* Logout */}
        <div className="card p-2">
          <SettingRow
            icon={LogOut}
            label="Sign Out"
            danger
            onClick={() => router.push("/login")}
          />
        </div>

        <p className="text-center text-[11px] text-text-secondary py-2">
          Tarkon Teacher Platform v1.0.0 · Build 2026.05
        </p>
      </div>
    </div>
  );
}
