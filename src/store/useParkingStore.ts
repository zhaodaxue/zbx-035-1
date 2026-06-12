import { create } from "zustand";
import type { ParkingRecord, ParkingStats } from "@/types/parking";
import { seedData } from "@/data/seedData";
import { getOvertimeRecords, isOvertime } from "@/utils/overtime";
import { groupByStatus, isToday } from "@/utils/grouping";

const SIMULATED_NOW = new Date("2026-06-12T10:00:00");

interface ParkingState {
  records: ParkingRecord[];
  plateFilter: string;
  now: Date;
  stats: ParkingStats;
  registerDeparture: (id: string) => void;
  setPlateFilter: (filter: string) => void;
}

function computeStats(records: ParkingRecord[], now: Date): ParkingStats {
  const { active, departed } = groupByStatus(records);
  const overtimeCount = getOvertimeRecords(active, now).length;
  const todayDeparted = departed.filter((r) => r.departedAt && isToday(r.departedAt, now)).length;
  return {
    currentCount: active.length,
    overtimeCount,
    todayDeparted,
  };
}

function deserializeRecords(records: ParkingRecord[]): ParkingRecord[] {
  return records.map((r) => ({
    ...r,
    entryTime: new Date(r.entryTime),
    allowedUntil: new Date(r.allowedUntil),
    departedAt: r.departedAt ? new Date(r.departedAt) : undefined,
  }));
}

export const useParkingStore = create<ParkingState>((set, get) => {
  const initialRecords = deserializeRecords(seedData);
  return {
    records: initialRecords,
    plateFilter: "",
    now: SIMULATED_NOW,
    stats: computeStats(initialRecords, SIMULATED_NOW),

    registerDeparture: (id: string) => {
      set((state) => {
        const updatedRecords = state.records.map((r) => {
          if (r.id === id && !r.isDeparted) {
            return {
              ...r,
              isDeparted: true,
              departedAt: new Date(state.now),
            };
          }
          return r;
        });
        return {
          records: updatedRecords,
          stats: computeStats(updatedRecords, state.now),
        };
      });
    },

    setPlateFilter: (filter: string) => {
      set({ plateFilter: filter });
    },
  };
});

export function useIsOvertime(record: ParkingRecord): boolean {
  const now = useParkingStore((state) => state.now);
  return isOvertime(record, now);
}
