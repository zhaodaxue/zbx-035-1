export interface ParkingRecord {
  id: string;
  plateSuffix: string;
  visitingResident: string;
  entryTime: Date;
  allowedUntil: Date;
  isDeparted: boolean;
  departedAt?: Date;
}

export interface ParkingStats {
  currentCount: number;
  overtimeCount: number;
  upcomingOvertimeCount: number;
  todayDeparted: number;
}
