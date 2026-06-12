import type { ParkingRecord } from "@/types/parking";

export function isOvertime(record: ParkingRecord, now: Date = new Date()): boolean {
  if (record.isDeparted) {
    return false;
  }
  return now > record.allowedUntil;
}

export function getOvertimeRecords(records: ParkingRecord[], now: Date = new Date()): ParkingRecord[] {
  return records.filter((r) => isOvertime(r, now));
}
