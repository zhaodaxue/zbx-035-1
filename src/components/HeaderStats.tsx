import { useEffect, useState } from "react";
import { Car, AlertTriangle, LogOut } from "lucide-react";
import { useParkingStore } from "@/store/useParkingStore";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 800;
    const startTime = performance.now();
    const startValue = 0;

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
  }, [value]);

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

  return (
    <header className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-6 px-8 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-wide">
              访客车辆临时停放告示
            </h1>
            <p className="text-white/80 text-sm">
              {formatDate(now)} · 当前时间 {formatTime(now)}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2 text-sm text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>实时监控中</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card animate-count-up" style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/70 text-xs">当前在场</p>
                <p className="text-3xl font-bold">
                  <AnimatedNumber value={stats.currentCount} />
                </p>
              </div>
            </div>
          </div>

          <div
            className={`stat-card animate-count-up ${stats.overtimeCount > 0 ? "ring-2 ring-red-400/50" : ""}`}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stats.overtimeCount > 0 ? "bg-red-500/30" : "bg-white/20"}`}>
                <AlertTriangle className={`w-5 h-5 ${stats.overtimeCount > 0 ? "text-red-200" : ""}`} />
              </div>
              <div>
                <p className="text-white/70 text-xs">超时未离场</p>
                <p className={`text-3xl font-bold ${stats.overtimeCount > 0 ? "text-red-300" : ""}`}>
                  <AnimatedNumber value={stats.overtimeCount} />
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card animate-count-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/70 text-xs">今日累计离场</p>
                <p className="text-3xl font-bold">
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
