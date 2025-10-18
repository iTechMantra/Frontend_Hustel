// Background Sync Service
import storageService from './storageService';

class SyncService {
  constructor({ intervalMs = 5 * 60 * 1000 } = {}) {
    this.intervalMs = intervalMs;
    this.timer = null;
    this.isRunning = false;
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.syncPendingRecords().catch(() => {}), this.intervalMs);
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  async syncPendingRecords() {
    if (this.isRunning || !navigator.onLine) return;
    this.isRunning = true;
    try {
      const batch = await storageService.listSyncQueue(100);
      for (const item of batch) {
        try {
          await this.pushRecord(item);
          await storageService.markEntitySynced(item.entity, item.entityUuid);
        } catch (err) {
          await storageService.setSyncError(item.id, String(err?.message || err));
        }
      }
    } finally {
      this.isRunning = false;
    }
  }

  async pushRecord(item) {
    // TODO: Integrate real API endpoints. For now, simulate success.
    await new Promise((r) => setTimeout(r, 50));
    return true;
  }
}

const syncService = new SyncService();
export default syncService;

