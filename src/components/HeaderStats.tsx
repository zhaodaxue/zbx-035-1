import { useEffect, useState } from "react";
import { Car, AlertTriangle, Clock, LogOut } from "lucide-react";
import { useParkingStore } from "@/store/useParkingStore";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (prevValue === value) return;

    const duration = 250;
    const startTime = performance.now();
    const startValue = prevValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startValue + (value - startValue) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    setPrevValue(value);
  }, [value, prevValue]);

  return <span>{display}</span>;
}

export default function HeaderStats() {
  const stats = useParkingStore((state) => state.stats);
  const now = useParkingStore((state) => state.now);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const showUpcoming = stats.upcomingOvertimeCount > 0;
  const gridCols = showUpcoming ? "grid-cols-4" : "grid-cols-3";

  return (
    <header className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-6 px-8 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-wide">
              访客车辆临时停放告示
            </h1>
            <p className="text-white/80 text-sm">
              {formatDate(now)} · 告示时间 {formatTime(now)}
            </p>
          </div>
        </div>

        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
          <div className="stat-card animate-count-up" style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/70 text-xs">当前在场</p>
                <p className="text-2xl md:text-3xl font-bold">
                  <AnimatedNumber value={stats.currentCount} />
                </p>
              </div>
            </div>
          </div>

          <div
            className={`stat-card animate-count-up ${stats.overtimeCount > 0 ? "ring-2 ring-red-400/50" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`p-2 rounded-lg ${stats.overtimeCount > 0 ? "bg-red-500/30" : "bg-white/20"}`}>
                <AlertTriangle className={`w-5 h-5 ${stats.overtimeCount > 0 ? "text-red-200" : ""}`} />
              </div>
              <div>
                <p className="text-white/70 text-xs">超时未离场</p>
                <p className={`text-2xl md:text-3xl font-bold ${stats.overtimeCount > 0 ? "text-red-300" : ""}`}>
                  <AnimatedNumber value={stats.overtimeCount} />
                </p>
              </div>
            </div>
          </div>

          {showUpcoming && (
            <div
              className="stat-card animate-count-up ring-2 ring-amber-400/50"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 rounded-lg bg-amber-500/30">
                  <Clock className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">即将超时</p>
                  <p className="text-2xl md:text-3xl font-bold text-amber-300">
                    <AnimatedNumber value={stats.upcomingOvertimeCount} />
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="stat-card animate-count-up" style={{ animationDelay: showUpcoming ? "0.3s" : "0.2s" }}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/70 text-xs">今日累计离场</p>
                <p className="text-2xl md:text-3xl font-bold">
                  <AnimatedNumber value={stats.todayDeparted} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
