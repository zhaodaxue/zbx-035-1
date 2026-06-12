import { useMemo } from "react";
import { Car } from "lucide-react";
import ParkingItem from "./ParkingItem";
import { useParkingStore } from "@/store/useParkingStore";
import { filterByPlateSuffix } from "@/utils/filter";
import { groupByStatus, sortByEntryTimeDesc } from "@/utils/grouping";

export default function ParkingList() {
  const records = useParkingStore((state) => state.records);
  const plateFilter = useParkingStore((state) => state.plateFilter);

  const activeRecords = useMemo(() => {
    const { active } = groupByStatus(records);
    const filtered = filterByPlateSuffix(active, plateFilter);
    return sortByEntryTimeDesc(filtered);
  }, [records, plateFilter]);

  if (activeRecords.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Car className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">
          {plateFilter ? "未找到匹配的车辆" : "暂无在场车辆"}
        </p>
        {plateFilter && (
          <p className="text-gray-400 text-sm mt-1">请尝试其他车牌尾号</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full" />
          在场车辆
          <span className="text-sm font-normal text-gray-500">
            （共 {activeRecords.length} 辆）
          </span>
        </h2>
      </div>
      {activeRecords.map((record, index) => (
        <div key={record.id} style={{ animationDelay: `${index * 0.05}s` }}>
          <ParkingItem record={record} />
        </div>
      ))}
    </div>
  );
}
