import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { TbBrandTabler } from "react-icons/tb";
import { IoColorFillOutline } from "react-icons/io5";
import Link from "next/link";
import DeleteButton from "../DeleteButton";
import { useState } from "react"

export default function GarageCarItem({carData, onDelete, onEdit}) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        setShowConfirm(false);
    }
    
    return (
        <div key={carData._id} className="flex bg-gray-100 rounded-lg border border-gray-400 p-1 hover:scale-105 transition duration-500 gap-2 shadow-box">
            <Link href={'/profile/garage/' + carData._id} className="w-48" hidden={showConfirm}>
                <div className="flex bg-gray-300 h-full items-center justify-center rounded-lg">
                    No image
                </div>
            </Link>
            <Link href={'/profile/garage/' + carData._id} className="w-full overflow-hidden h-24" hidden={showConfirm}>
                <div className="grow">
                    <div className="flex">
                        <div className="w-1/2 flex font-semibold text-primary italic font-xl items-center">
                            {carData.nameOfTheCar}
                        </div>
                        <div className="w-1/2 flex gap-1 items-center">
                                <MdOutlineSpeakerNotes />
                                {carData.notes.length}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 flex gap-1 items-center">
                                <TbBrandTabler className="w-5 h-5"/>
                                {carData.licensePlate}
                        </div>
                        <div className="w-1/2 flex gap-1 items-center">
                                <IoColorFillOutline />
                                {carData.color}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 flex gap-1 items-center">
                            <CiCalendarDate className="w-5 h-5"/>
                            {carData.year}
                        </div>
                        <div className="w-1/2 flex gap-1 items-center">
                            <IoLayersOutline />
                            {carData.model}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <IoInformationCircleOutline className="w-5 h-5"/>
                    </div>
                    <div className="truncate ...">
                        {carData.description}{carData.description}{carData.description}
                    </div>
                </div>
            </Link>
            <div hidden={showConfirm}>
                <div className="flex flex-col h-full justify-around">
                    <div onClick={onEdit} className="bg-green-300 text-black border border-gray-500 p-2 rounded-lg cursor-pointer"><GrEdit /></div>
                    <div onClick={() => setShowConfirm(true)} className="flex bg-red-400 text-black border border-gray-500 p-2 rounded-lg cursor-pointer"><GoTrash /></div>
                </div>
            </div>
            <DeleteButton className="w-full" onDelete={onDelete} handleConfirm={handleConfirm} confirmState={showConfirm}/>
        </div>
    )
}