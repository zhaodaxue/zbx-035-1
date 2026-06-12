import { useState } from "react";
import { AlertCircle, Clock, User, Calendar, LogOut } from "lucide-react";
import type { ParkingRecord } from "@/types/parking";
import { useParkingStore, useIsOvertime } from "@/store/useParkingStore";
import { getRemainingMinutes, isUpcomingOvertime } from "@/utils/overtime";
import { cn } from "@/lib/utils";

interface ParkingItemProps {
  record: ParkingRecord;
  isDeparted?: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ParkingItem({ record, isDeparted = false }: ParkingItemProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const registerDeparture = useParkingStore((state) => state.registerDeparture);
  const highlightedRecordId = useParkingStore((state) => state.highlightedRecordId);
  const now = useParkingStore((state) => state.now);
  const isOvertime = useIsOvertime(record);
  const isHighlighted = highlightedRecordId === record.id;
  const isUpcoming = !isDeparted && !isOvertime && isUpcomingOvertime(record, now);
  const remaining = !isDeparted ? getRemainingMinutes(record, now) : -1;

  const handleDeparture = () => {
    setIsLeaving(true);
    setTimeout(() => {
      registerDeparture(record.id);
    }, 300);
  };

  return (
    <div
      id={`parking-item-${record.id}`}
      className={cn(
        "card p-4 transition-all duration-300",
        isLeaving ? "animate-fade-out" : "animate-fade-in",
        isOvertime && !isDeparted && "border-l-4 border-l-accent-danger bg-red-50/50",
        isUpcoming && !isOvertime && "border-l-4 border-l-amber-400 bg-amber-50/30",
        isDeparted && "bg-gray-50",
        !isDeparted && "hover:shadow-md hover:-translate-y-0.5",
        isHighlighted && [
          "ring-2 ring-amber-400 shadow-lg shadow-amber-200/50",
          "animate-highlight-pulse",
        ]
      )}
    >
      <div className="flex items-start gap-4">
        {isOvertime && !isDeparted && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-accent-danger flex items-center justify-center animate-pulse">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        {isUpcoming && !isOvertime && !isDeparted && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={cn(
                "px-3 py-1 rounded-lg font-bold text-lg tracking-wider",
                isDeparted ? "bg-gray-200 text-gray-500" : "bg-primary/10 text-primary"
              )}
            >
              尾号 {record.plateSuffix}
            </span>
            {isOvertime && !isDeparted && (
              <span className="px-2 py-0.5 bg-accent-danger/10 text-accent-danger text-xs font-medium rounded-full">
                已超时 {Math.abs(remaining)} 分钟
              </span>
            )}
            {isUpcoming && !isOvertime && !isDeparted && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                剩余 {remaining} 分钟
              </span>
            )}
            {isDeparted && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-500 text-xs font-medium rounded-full">
                已离场
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <User className="w-4 h-4 text-gray-400" />
            <span>来访：{record.visitingResident}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>驶入：{formatTime(record.entryTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock
                className={cn(
                  "w-4 h-4",
                  isOvertime ? "text-accent-danger" : isUpcoming ? "text-amber-500" : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  isOvertime && "text-accent-danger font-medium",
                  isUpcoming && !isOvertime && "text-amber-600 font-medium"
                )}
              >
                允许停放至：{formatTime(record.allowedUntil)}
              </span>
            </div>
            {isDeparted && record.departedAt && (
              <div className="flex items-center gap-1.5">
                <LogOut className="w-4 h-4 text-gray-400" />
                <span>离场：{formatTime(record.departedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {!isDeparted && (
          <div className="flex-shrink-0">
            <button onClick={handleDeparture} className="btn-primary text-sm">
              登记离场
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
