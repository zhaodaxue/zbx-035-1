import type { ParkingRecord } from "@/types/parking";

export function groupByStatus(records: ParkingRecord[]): {
  active: ParkingRecord[];
  departed: ParkingRecord[];
} {
  return {
    active: records.filter((r) => !r.isDeparted),
    departed: records.filter((r) => r.isDeparted),
  };
}

export function sortByEntryTimeDesc(records: ParkingRecord[]): ParkingRecord[] {
  return [...records].sort((a, b) => b.entryTime.getTime() - a.entryTime.getTime());
}

export function isToday(date: Date, today: Date = new Date()): boolean {
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
