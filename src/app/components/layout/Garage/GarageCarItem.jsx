import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import Link from "next/link";
import DeleteButton from "../DeleteButton";
import { useState } from "react"

export default function GarageCarItem({car, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false)

    const handleConfirm = () => {
        setShowConfirm(false);
    }

    return (
        <div key={car._id} className="flex bg-gray-100 rounded-lg border border-gray-400 p-2 hover:scale-105 transition duration-500 gap-2 shadow-box">
            <Link href={'/profile/garage/' + car._id} className="w-48" hidden={showConfirm}>
                <div className="flex bg-gray-300 h-full items-center justify-center rounded-lg">
                    No image
                </div>
            </Link>
            <Link href={'/profile/garage/' + car._id} className="w-full overflow-hidden" hidden={showConfirm}>
                <div className="h-1/2">
                    <div className="flex">
                        <div className="w-1/2 flex font-semibold text-primary italic font-xl items-center">
                            {car.nameOfTheCar}
                        </div>
                        <div className="w-1/2 flex gap-1 items-center">
                            <MdOutlineSpeakerNotes />
                            {car.notes.length}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 flex gap-1 items-center">
                            <CiCalendarDate className="w-5 h-5"/>
                            {car.year}
                        </div>
                        <div className="w-1/2 flex gap-1 items-center">
                            <IoLayersOutline />
                            {car.model}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 h-1/2">
                    <div className="flex mt-1">
                        <IoInformationCircleOutline className="w-5 h-5"/>
                    </div>
                    <span className="block break-all ... h-12">
                        {car.description}
                    </span>
                </div>
            </Link>
            <div hidden={showConfirm}>
                <div className="flex flex-col h-full justify-around">
                    <Link href={'/profile/garage/edit/'+car._id} className="bg-green-300 text-black border border-gray-500 p-2 rounded-lg cursor-pointer"><GrEdit /></Link>
                    <div onClick={() => setShowConfirm(true)} className="flex bg-red-400 text-black border border-gray-500 p-2 rounded-lg cursor-pointer"><GoTrash /></div>
                </div>
            </div>
            <DeleteButton className="w-full" onDelete={onDelete} handleConfirm={handleConfirm} confirmState={showConfirm}/>
        </div>
    )
}