// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";   // ✅ important for Tailwind
import syncService from './services/syncService.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Start background sync
syncService.start();

// Register service worker for offline caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}

// Reminder polling with Notification API
import { listDueReminders } from './services/reminderService.js';
import storageService from './services/storageService.js';

async function maybeRequestNotificationPermission() {
  try {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  } catch (_) {}
}

async function showLocalNotification(title, body) {
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && Notification.permission === 'granted') {
        reg.showNotification(title, { body });
        return;
      }
    }
    if (Notification.permission === 'granted') new Notification(title, { body });
  } catch (_) {}
}

async function pollReminders() {
  try {
    const due = await listDueReminders(new Date());
    for (const n of due) {
      if (!n.seen) {
        await showLocalNotification(n.title || 'Reminder', 'Scheduled activity is due');
        if (n.uuid) await storageService.markNotificationSeen(n.uuid);
      }
    }
  } catch (_) {}
}

maybeRequestNotificationPermission();
setInterval(pollReminders, 60 * 1000);
