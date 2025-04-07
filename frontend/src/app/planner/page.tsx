import HousePlanner from "@/features/housePlanner/HousePlanner";
import { HouseSettings } from "@/features/housePlanner/components/HouseSettings/HouseSettings";
// import { Materials } from "@/features/housePlanner/components/Materials/Materials";
// import { RoofSettings } from "@/features/housePlanner/components/RoofSettings/RoofSettings";

export default function Planner() {
    return (
        <div className="flex min-h-screen">
            <div className="absolute p-4 ">
                <HouseSettings />
            </div>
            {/* Right column (Canvas) */}
            <div className="w-full">
                <HousePlanner />
            </div>
        </div>
    );
}
