import { useMemo, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { useParkingStore } from "@/store/useParkingStore";
import { getUpcomingOvertimeRecords, getRemainingMinutes, getOvertimeRecords } from "@/utils/overtime";
import { filterByPlateSuffix } from "@/utils/filter";
import { groupByStatus } from "@/utils/grouping";
import type { ParkingRecord } from "@/types/parking";

interface WarningBarProps {
  onRecordClick?: (record: ParkingRecord) => void;
}

export default function WarningBar({ onRecordClick }: WarningBarProps) {
  const records = useParkingStore((state) => state.records);
  const now = useParkingStore((state) => state.now);
  const plateFilter = useParkingStore((state) => state.plateFilter);
  const highlightedRecordId = useParkingStore((state) => state.highlightedRecordId);
  const setHighlightedRecordId = useParkingStore((state) => state.setHighlightedRecordId);

  const { upcomingRecords, overtimeRecords, totalWarningCount } = useMemo(() => {
    const { active } = groupByStatus(records);
    const filteredActive = filterByPlateSuffix(active, plateFilter);
    const upcoming = getUpcomingOvertimeRecords(filteredActive, now);
    const overtime = getOvertimeRecords(filteredActive, now);
    return {
      upcomingRecords: upcoming,
      overtimeRecords: overtime,
      totalWarningCount: upcoming.length + overtime.length,
    };
  }, [records, now, plateFilter]);

  useEffect(() => {
    if (highlightedRecordId) {
      const timer = setTimeout(() => {
        setHighlightedRecordId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedRecordId, setHighlightedRecordId]);

  const handleClick = (record: ParkingRecord) => {
    const element = document.getElementById(`parking-item-${record.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedRecordId(record.id);
    }
    onRecordClick?.(record);
  };

  if (totalWarningCount === 0) {
    if (plateFilter) {
      return (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm text-gray-500">
          筛选范围内无预警车辆
        </div>
      );
    }
    return null;
  }

  const allWarnings = [...overtimeRecords, ...upcomingRecords];

  return (
    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <span className="text-sm font-medium text-amber-800">
          预警车辆（共 {totalWarningCount} 辆）
        </span>
        <span className="text-xs text-amber-600">
          点击可快速定位
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {overtimeRecords.map((record) => {
          const remaining = getRemainingMinutes(record, now);
          return (
            <button
              key={`overtime-${record.id}`}
              onClick={() => handleClick(record)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         bg-red-100 text-red-700 hover:bg-red-200 transition-colors
                         ${highlightedRecordId === record.id ? "ring-2 ring-red-500" : ""}`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="font-bold">尾号 {record.plateSuffix}</span>
              <span className="text-red-600">已超时 {Math.abs(remaining)} 分钟</span>
            </button>
          );
        })}

        {upcomingRecords.map((record) => {
          const remaining = getRemainingMinutes(record, now);
          return (
            <button
              key={`upcoming-${record.id}`}
              onClick={() => handleClick(record)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors
                         ${highlightedRecordId === record.id ? "ring-2 ring-amber-500" : ""}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="font-bold">尾号 {record.plateSuffix}</span>
              <span className="text-amber-600">剩余 {remaining} 分钟</span>
            </button>
          );
        })}
      </div>

      {plateFilter && totalWarningCount === allWarnings.length && (
        <p className="mt-2 text-xs text-amber-600">
          以上为筛选「{plateFilter}」后的预警结果
        </p>
      )}
    </div>
  );
}
