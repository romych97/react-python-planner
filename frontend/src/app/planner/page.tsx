import HouseCanvas from "@/features/housePlanner/components/HouseCanvas/HouseCanvas";
import { HouseSettings } from "@/features/housePlanner/components/HouseSettings/HouseSettings";
import { Materials } from "@/features/housePlanner/components/Materials/Materials";
import { RoofSettings } from "@/features/housePlanner/components/RoofSettings/RoofSettings";
import { SaveProject } from "@/features/housePlanner/components/SaveProject";

export default function Planner() {
    return (
        <div className="flex container mx-auto min-h-screen">
            <div className="md:w-[400px] p-4 bg-[#f8f9fa] border border-[#dadce0]">
                <HouseSettings />
                <RoofSettings />
                <Materials />
                <SaveProject />
            </div>
            {/* Right column (Canvas) */}
            <div className="ml-4 w-3/4">
                <HouseCanvas />
            </div>
        </div>
    );
}
