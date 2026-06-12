import type { ParkingRecord } from "@/types/parking";

export function filterByPlateSuffix(
  records: ParkingRecord[],
  suffix: string
): ParkingRecord[] {
  const trimmed = suffix.trim().toUpperCase();
  if (!trimmed) {
    return records;
  }
  return records.filter((r) =>
    r.plateSuffix.toUpperCase().includes(trimmed)
  );
}
