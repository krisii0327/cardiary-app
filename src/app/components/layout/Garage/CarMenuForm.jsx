import SectionHeaders from "@/app/components/layout/SectionHeaders";
import { useState } from "react";

export default function CarMenuForm({carData, handleCarEvent, handleBack}) {
    const [nameOfTheCar, setNameOfTheCar] = useState(carData?.nameOfTheCar || '');
    const [model, setModel] = useState(carData?.model || '');
    const [year, setYear] = useState(carData?.year || '');
    const [color, setColor] = useState(carData?.color || '');
    const [licensePlate, setLicensePlate] = useState(carData?.licensePlate || '');
    const [description, setDescription] = useState(carData?.description || '');

    const _id = carData?._id

    return (
        <div className="fixed bg-black/70 flex inset-0 items-center justify-center z-20">
            <div className="flex flex-col rounded-lg shadow-box gap-2 p-4 bg-white">
                <form onSubmit={ev => handleCarEvent(ev, {_id, nameOfTheCar, color, licensePlate, year, model, description})}>
                    <SectionHeaders subHeader={"Creating a new car"} />
                    <div className="block w-80 mt-8">
                        <label>Name of the car</label>
                        <input type="text" value={nameOfTheCar || ''} onChange={ev => setNameOfTheCar(ev.target.value)}/>
                        <label>Model</label>
                        <input type="text" value={model || ''} onChange={ev => setModel(ev.target.value)}/>
                        <label>Year</label>
                        <input type="number" value={year || ''} onChange={ev => setYear(ev.target.value)}/>
                        <label>Color</label>
                        <input type="text" value={color || ''} onChange={ev => setColor(ev.target.value)}/>
                        <label>License Plate</label>
                        <input type="text" value={licensePlate || ''} onChange={ev => setLicensePlate(ev.target.value)}/>
                        <label>Description</label>
                        <input type="text" value={description || ''} onChange={ev => setDescription(ev.target.value)}/>
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