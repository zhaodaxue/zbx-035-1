import type { ParkingRecord } from "@/types/parking";

const today = new Date("2026-06-12");

function setTime(base: Date, hours: number, minutes: number): Date {
  const d = new Date(base);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

export const seedData: ParkingRecord[] = [
  {
    id: "1",
    plateSuffix: "A8",
    visitingResident: "3栋 1202室",
    entryTime: setTime(today, 8, 30),
    allowedUntil: setTime(today, 10, 30),
    isDeparted: false,
  },
  {
    id: "2",
    plateSuffix: "6B",
    visitingResident: "7栋 501室",
    entryTime: setTime(today, 9, 15),
    allowedUntil: setTime(today, 11, 15),
    isDeparted: false,
  },
  {
    id: "3",
    plateSuffix: "33",
    visitingResident: "1栋 803室",
    entryTime: setTime(today, 7, 45),
    allowedUntil: setTime(today, 9, 45),
    isDeparted: false,
  },
  {
    id: "4",
    plateSuffix: "F9",
    visitingResident: "5栋 1506室",
    entryTime: setTime(today, 10, 0),
    allowedUntil: setTime(today, 12, 0),
    isDeparted: false,
  },
  {
    id: "5",
    plateSuffix: "M2",
    visitingResident: "9栋 304室",
    entryTime: setTime(today, 6, 30),
    allowedUntil: setTime(today, 8, 30),
    isDeparted: false,
  },
  {
    id: "6",
    plateSuffix: "7E",
    visitingResident: "2栋 602室",
    entryTime: setTime(today, 9, 50),
    allowedUntil: setTime(today, 11, 50),
    isDeparted: false,
  },
  {
    id: "7",
    plateSuffix: "4H",
    visitingResident: "6栋 901室",
    entryTime: setTime(today, 8, 0),
    allowedUntil: setTime(today, 10, 0),
    isDeparted: true,
    departedAt: setTime(today, 9, 45),
  },
  {
    id: "8",
    plateSuffix: "K5",
    visitingResident: "10栋 203室",
    entryTime: setTime(today, 7, 0),
    allowedUntil: setTime(today, 9, 0),
    isDeparted: true,
    departedAt: setTime(today, 8, 50),
  },
  {
    id: "9",
    plateSuffix: "8N",
    visitingResident: "4栋 1105室",
    entryTime: setTime(today, 9, 30),
    allowedUntil: setTime(today, 11, 30),
    isDeparted: true,
    departedAt: setTime(today, 11, 15),
  },
  {
    id: "10",
    plateSuffix: "P1",
    visitingResident: "8栋 702室",
    entryTime: setTime(today, 8, 20),
    allowedUntil: setTime(today, 10, 20),
    isDeparted: true,
    departedAt: setTime(today, 10, 5),
  },
];
