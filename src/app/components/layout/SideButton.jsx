import { Trash2, Pencil } from "lucide-react";
import DeleteButton from "@/app/components/layout/DeleteButton";

export default function SideButton({onDelete, onEdit, showConfirm, setShowConfirm, className}) {
    const handleConfirm = () => {
        setShowConfirm(false);
    }

    return (
        <>
            <div  className="my-auto" hidden={showConfirm}>
                <div className={`flex justify-end gap-2 ${className}`}>
                    <div onClick={onEdit} className="flex p-1 border border-gray-500 rounded-lg bg-green-400 cursor-pointer"><Pencil size={20} strokeWidth={1.3} /></div>
                    <div onClick={() => setShowConfirm(true)} className="flex p-1 border border-gray-500 rounded-lg bg-red-400 cursor-pointer"><Trash2 size={20} strokeWidth={1.3}/></div>
                </div>
            </div>
            <DeleteButton className="w-full" onDelete={onDelete} handleConfirm={handleConfirm} confirmState={showConfirm}/>
        </>
    )
}