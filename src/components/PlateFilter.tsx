import { Search } from "lucide-react";
import { useParkingStore } from "@/store/useParkingStore";

export default function PlateFilter() {
  const plateFilter = useParkingStore((state) => state.plateFilter);
  const setPlateFilter = useParkingStore((state) => state.setPlateFilter);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={plateFilter}
        onChange={(e) => setPlateFilter(e.target.value)}
        placeholder="输入车牌尾号后两位，如 A8"
        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                   bg-gray-50 text-gray-900 placeholder-gray-400
                   focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-all duration-200
                   text-base tracking-wide"
        maxLength={2}
        autoComplete="off"
      />
      {plateFilter && (
        <button
          onClick={() => setPlateFilter("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center
                     text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
