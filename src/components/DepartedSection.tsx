import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import ParkingItem from "./ParkingItem";
import { useParkingStore } from "@/store/useParkingStore";
import { filterByPlateSuffix } from "@/utils/filter";
import { groupByStatus, sortByEntryTimeDesc } from "@/utils/grouping";

export default function DepartedSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const records = useParkingStore((state) => state.records);
  const plateFilter = useParkingStore((state) => state.plateFilter);

  const departedRecords = useMemo(() => {
    const { departed } = groupByStatus(records);
    const filtered = filterByPlateSuffix(departed, plateFilter);
    return sortByEntryTimeDesc(filtered);
  }, [records, plateFilter]);

  if (departedRecords.length === 0 && !plateFilter) {
    return null;
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 card hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-gray-400" />
          <span className="font-semibold text-gray-700">已离场车辆</span>
          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
            {departedRecords.length} 辆
          </span>
        </div>
        <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3 overflow-hidden animate-slide-down">
          {departedRecords.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              未找到匹配的离场记录
            </div>
          ) : (
            departedRecords.map((record) => (
              <ParkingItem key={record.id} record={record} isDeparted />
            ))
          )}
        </div>
      )}
    </div>
  );
}
