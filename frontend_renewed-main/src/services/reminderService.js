// Offline reminders using notifications table; service worker can show notifications
import storageService from './storageService';

export async function scheduleVaccinationReminder({ patientUuid, title, dueAt }) {
  return storageService.addNotification({
    type: 'vaccination',
    title: title || 'Vaccination Reminder',
    patientUuid,
    dueAt: typeof dueAt === 'string' ? dueAt : new Date(dueAt).toISOString(),
    seen: false
  });
}

export async function listDueReminders(now = new Date()) {
  return storageService.listPendingNotifications(now);
}


