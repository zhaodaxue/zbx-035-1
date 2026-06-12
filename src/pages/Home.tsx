import HeaderStats from "@/components/HeaderStats";
import PlateFilter from "@/components/PlateFilter";
import ParkingList from "@/components/ParkingList";
import DepartedSection from "@/components/DepartedSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderStats />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-6">
          <PlateFilter />
        </div>

        <div className="max-h-[calc(100vh-380px)] overflow-y-auto pr-2 scrollbar-thin">
          <ParkingList />
          <DepartedSection />
        </div>

        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
          <p>访客车辆请遵守小区停放规定，超时未离场将被提醒</p>
        </footer>
      </main>
    </div>
  );
}
