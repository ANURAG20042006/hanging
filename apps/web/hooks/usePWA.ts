"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function usePWA() {
  const [isOffline, setIsOffline] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("[PWA] Service Worker registered with scope:", reg.scope))
        .catch((err) => console.error("[PWA] Service Worker registration failed:", err));
    }

    // 2. Network Status Listener
    const handleOnline = () => {
      setIsOffline(false);
      toast.success("Back Online! Squad sync active. 🟢");
    };
    const handleOffline = () => {
      setIsOffline(true);
      toast.error("You are Offline. Offline caching mode active. 🔴");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. BeforeInstallPrompt Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) {
      toast("App is ready to install! Use your browser's 'Add to Home Screen' option. 📱");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      toast.success("Hangout PWA installed successfully! 📱");
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return { isOffline, isInstallable, triggerInstall };
}
