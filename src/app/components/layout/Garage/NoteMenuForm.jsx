import SectionHeaders from "@/app/components/layout/SectionHeaders";
import { useState } from "react";
import moment from "moment";

export default function NoteMenuForm({noteData, handleNoteEvent, handleBack}) {
    const [short_desc, setShort_Desc] = useState(noteData?.short_desc || '');
    const [long_desc, setLong_Desc] = useState(noteData?.long_desc || '');
    const [kilometer, setKilometer] = useState(noteData?.kilometer || '');
    const [category, setCategory] = useState(noteData?.category || '');
    const [price, setPrice] = useState(noteData?.price || '');
    const [date, setDate] = useState(moment(noteData?.date).format("YYYY-MM-DD") || '');

    return (
        <div className="fixed bg-black/70 flex inset-0 items-center justify-center z-20">
            <div className="flex flex-col rounded-lg shadow-box gap-2 p-4 bg-white">
                <form onSubmit={ev => handleNoteEvent(ev, {short_desc, long_desc, kilometer, category, price, date})}>
                    <SectionHeaders subHeader={"New note"} />
                    <div className="block w-80 mt-8">
                        <label>Service short info</label>
                        <input type="text" value={short_desc} onChange={ev => (setShort_Desc(ev.target.value))}/>
                        <label>Service category</label>
                        <input type="text" value={category} onChange={ev => (setCategory(ev.target.value))}/>
                        <label>Kilometer</label>
                        <input type="number" value={kilometer} onChange={ev => (setKilometer(ev.target.value))}/>
                        <label>Cost of service</label>
                        <input type="number" value={price} onChange={ev => (setPrice(ev.target.value))}/>
                        <label>Service long description</label>
                        <input type="text" value={long_desc} onChange={ev => (setLong_Desc(ev.target.value))}/>
                        <label>Date</label>
                        <input type="date" value={date} onChange={ev => (setDate(ev.target.value))}/>
                    </div>
                    <div className="flex grow justify-between gap-6">
                        <button type="submit" className="button-black-full">Save</button>
                    </div>
                </form>
                <div>
                    <button className="button-white-full" onClick={handleBack}>Cancel</button>     
                </div>
            </div>
        </div>
    )
}