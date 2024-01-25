import SectionHeaders from "@/app/components/layout/SectionHeaders";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CarMenuForm({carData, handleCarEvent, handleBack}) {
    const [nameOfTheCar, setNameOfTheCar] = useState(carData?.nameOfTheCar || '');
    const [model, setModel] = useState(carData?.model || '');
    const [year, setYear] = useState(carData?.year || '');
    const [color, setColor] = useState(carData?.color || '');
    const [licensePlate, setLicensePlate] = useState(carData?.licensePlate || '');
    const [description, setDescription] = useState(carData?.description || '');
    const [images, setImages] = useState(carData?.images || []);
    const [currentImage, setCurrentImage] = useState(carData?.images[0] || '');

    const _id = carData?._id;

    async function handleFileChange(ev) {
        const files = ev.target.files;

        if(files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                const link = await response.json();

                if(response.ok) {
                    resolve();
                    setImages(images => [link, ...images]);
                    setCurrentImage(link);
                } else {
                    reject();
                }
            })
            
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete!',
                error: 'Upload error!'
            });
        };
    }

    return (
        <div className="fixed bg-black/70 flex inset-0 items-center justify-center z-20">
            <div className="flex flex-col rounded-lg shadow-box gap-2 p-4 bg-white">
                <form onSubmit={ev => handleCarEvent(ev, {_id, nameOfTheCar, color, licensePlate, year, model, description, images})}>
                    <SectionHeaders subHeader={"Creating a new car"}/>
                    <div className="flex flex-col md:flex-row mt-8 gap-4 justify-center items-center mb-4">
                        {/* photo section */}
                        <div className="flex flex-col h-full gap-4">
                            <div className="w-64 h-40 bg-gray-300 rounded-lg border border-gray-400">
                                {images.length > 0 && 
                                    <div className="flex h-full justify-center items-center relative">
                                        <Image src={currentImage} alt={currentImage} fill objectFit="fill"></Image>
                                   </div>
                                }
                                {images.length == 0 && 
                                    <span className="flex h-full justify-center items-center">
                                        No image
                                   </span>
                                }
                            </div>
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}/>
                                <span className="button-black-full cursor-pointer">Upload Image</span>
                            </label>
                        </div>

                        {/* label section */}
                        <div className="block w-80">
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