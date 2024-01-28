import { Calendar, Info, Wrench, DollarSign, Gauge, CornerDownRight } from "lucide-react";
import { useState } from "react";
import moment from "moment";
import SideButton from "@/app/components/layout/SideButton";

export default function GarageNoteItem({noteData, onDelete, onEdit, sideButtonHidden = false}) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="flex w-full bg-gray-100 rounded-lg p-2 border border-gray-400 h-12 hover:scale-[1.02] hover:h-full group transition duration-500">
            {/* mobile version */}
            <div className="w-full gap-2 flex md:hidden items-center">
                <div className="my-auto grow" hidden={showConfirm}>
                    <div className="flex flex-col w-full justify-between">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center">
                                <Info size={20} strokeWidth={1.3}/>
                                <span className="truncate">
                                    {noteData.short_desc}
                                </span>
                            </div>
                            <div className="flex gap-1 items-center justify-end">
                                    <Calendar size={20} strokeWidth={1.3}/>
                                    {moment(noteData.date).format("YYYY-MM-DD")}
                            </div>
                        </div>
                        
                        {/* note hover infos */}
                        <div className="hidden group-hover:block group-hover:h-full">
                            <div className="flex gap-1 items-center justify-start">
                                <Wrench size={20} strokeWidth={1.3}/>
                                {noteData.category}
                            </div>
                            <div className="flex gap-1 items-center">
                                <CornerDownRight size={20} strokeWidth={1.3}/>
                                {noteData.long_desc}
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex gap-1 items-center">
                                    <Gauge size={20} strokeWidth={1.3}/>
                                    {noteData.kilometer}
                                </div>
                                <div className="flex gap-1 items-center">
                                    <DollarSign size={20} strokeWidth={1.3}/>
                                    {noteData.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* side buttons */}
                {sideButtonHidden == true && (
                    <SideButton onDelete={onDelete} onEdit={onEdit} showConfirm={showConfirm} setShowConfirm={setShowConfirm} className={"flex-row group-hover:flex-col"}/>
                )}
            </div>

            {/* desktop version */}
            <div className="w-full gap-2 hidden md:flex items-center">
                {/* note info */}
                <div className="my-auto grow" hidden={showConfirm}>
                    <div className="grid grid-cols-[1fr_30%_auto] w-full items-center justify-between">
                        <div className="flex gap-1 items-center truncate">
                            <Info size={20} strokeWidth={1.3}/>
                            <span className="truncate">
                                {noteData.short_desc}
                            </span>
                        </div>
                        <div className="flex gap-1 items-center justify-start">
                            <Wrench size={20} strokeWidth={1.3}/>
                            {noteData.category}
                        </div>
                        <div className="flex gap-1 items-center justify-end">
                            <Calendar size={20} strokeWidth={1.3}/>
                            {moment(noteData.date).format("YYYY-MM-DD")}
                        </div>
                    </div>
                    {/* note hover infos */}
                    <div className="hidden group-hover:block group-hover:h-full">
                        <div className="flex gap-1 items-center">
                            <CornerDownRight size={20} strokeWidth={1.3}/>
                            {noteData.long_desc}
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex gap-1 items-center">
                                <Gauge size={20} strokeWidth={1.3}/>
                                {noteData.kilometer}
                            </div>
                            <div className="flex gap-1 items-center">
                                <DollarSign size={20} strokeWidth={1.3}/>
                                {noteData.price}
                            </div>
                        </div>
                    </div>
                </div>

                {/* side buttons */}
                {sideButtonHidden == true && (
                    <SideButton onDelete={onDelete} onEdit={onEdit} showConfirm={showConfirm} setShowConfirm={setShowConfirm} className={"flex-row group-hover:flex-col"}/>
                )}
            </div>
        </div>
    )
}