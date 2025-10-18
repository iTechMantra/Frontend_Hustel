// Offline rule engine for high-risk alerts
import storageService from './storageService';

export function evaluateVitals({ bp, hb, patientUuid }) {
  const alerts = [];
  if (bp && (bp.systolic > 140 || bp.diastolic > 90)) alerts.push('HYPERTENSION_RISK');
  if (typeof hb === 'number' && hb < 7.0) alerts.push('SEVERE_ANEMIA');
  if (alerts.length) {
    alerts.forEach(async (code) => {
      await storageService.addNotification({
        type: 'rule_alert',
        code,
        patientUuid,
        dueAt: new Date().toISOString(),
        seen: false
      });
    });
  }
  return alerts;
}


