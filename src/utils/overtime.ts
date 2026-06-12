import type { ParkingRecord } from "@/types/parking";

export const UPCOMING_OVERTIME_THRESHOLD_MINUTES = 30;

export function isOvertime(record: ParkingRecord, now: Date = new Date()): boolean {
  if (record.isDeparted) {
    return false;
  }
  return now > record.allowedUntil;
}

export function getOvertimeRecords(records: ParkingRecord[], now: Date = new Date()): ParkingRecord[] {
  return records.filter((r) => isOvertime(r, now));
}

export function getRemainingMinutes(record: ParkingRecord, now: Date = new Date()): number {
  if (record.isDeparted) return -1;
  const diff = record.allowedUntil.getTime() - now.getTime();
  return Math.floor(diff / 60000);
}

export function isUpcomingOvertime(record: ParkingRecord, now: Date = new Date()): boolean {
  if (record.isDeparted) return false;
  if (isOvertime(record, now)) return false;
  const remaining = getRemainingMinutes(record, now);
  return remaining >= 0 && remaining <= UPCOMING_OVERTIME_THRESHOLD_MINUTES;
}

export function getUpcomingOvertimeRecords(
  records: ParkingRecord[],
  now: Date = new Date()
): ParkingRecord[] {
  return records
    .filter((r) => isUpcomingOvertime(r, now))
    .sort((a, b) => getRemainingMinutes(a, now) - getRemainingMinutes(b, now));
}
