import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SideButton from "@/app/components/layout/SideButton";
import { Calendar, NotebookText, SprayCan, FormInput, Blend } from "lucide-react";

export default function GarageCarItem({carData, onDelete, onEdit}) {
    const [showConfirm, setShowConfirm] = useState(false);
    
    return (
        <div key={carData._id} className="flex bg-gray-100 rounded-lg border border-gray-400 p-1 hover:scale-105 transition duration-500 gap-2 shadow-box h-24">
            {/* car image */}
            <Link href={'/profile/garage/' + carData._id} className="w-44" hidden={showConfirm}>
                {carData.images[0] && (
                    <div className="flex h-full justify-center items-center relative">
                        <Image src={carData.images[0]} alt={"Photo of " + carData.nameOfTheCar} fill style={{objectFit:"cover"}} className="rounded-lg" sizes="100%" priority></Image>
                    </div>
                )}
                {carData.images.length == 0 && (
                    <div className="flex bg-gray-300 h-full items-center justify-center rounded-lg">
                        No image
                    </div>
                )}
            </Link>
            {/* car infos */}
            <Link href={'/profile/garage/' + carData._id} className="w-full overflow-hidden h-20" hidden={showConfirm}>
                <div className="flex flex-col justify-between h-full">
                    <div className="grid grid-cols-[60%_40%]">
                        <div className="flex font-semibold text-primary italic font-xl items-center">
                            {carData.nameOfTheCar}
                        </div>
                        <div className="flex gap-1 items-center">
                                <NotebookText size={20} strokeWidth={1.3}/>
                                {carData.notes.length}
                        </div>
                    </div>
                    <div className="grid grid-cols-[60%_40%]">
                        <div className="flex gap-1 items-center">
                                <FormInput size={20} strokeWidth={1.3}/>
                                <span className="truncate">
                                    {carData.licensePlate}
                                </span>
                        </div>
                        <div className="flex gap-1 items-center">
                                <SprayCan size={20} strokeWidth={1.3} className="transform -scale-x-100"/>
                                {carData.color}
                        </div>
                    </div>
                    <div className="grid grid-cols-[60%_40%]">
                        <div className="flex gap-1 items-center">
                            <Calendar size={20} strokeWidth={1.3}/>
                            {carData.year}
                        </div>
                        <div className="flex gap-1 items-center">
                            <Blend size={20} strokeWidth={1.3}/>
                            {carData.model}
                        </div>
                    </div>
                </div>
            </Link>

           {/* side buttons */}
           <SideButton onDelete={onDelete} onEdit={onEdit} showConfirm={showConfirm} setShowConfirm={setShowConfirm} className={"flex-col"}/>
        </div>
    )
}