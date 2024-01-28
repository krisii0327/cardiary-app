import Image from "next/image";
import { Camera } from "lucide-react";

export default function CarItem({carData}) {
    return (
        <div className="flex flex-col hover:scale-90 transition duration-500 cursor-pointer">
            <div className="flex h-32 w-full">
                {carData.images.length >= 1 && (
                    <div className="flex h-full w-full relative">
                        <Image src={carData?.images?.[0]} alt={"Photo of " + carData.nameOfTheCar} fill style={{objectFit:"fill"}} className="rounded-lg shadow-box" sizes="100%" priority></Image>
                    </div>
                )}
                {carData.images.length == 0 && (
                    <div className="flex flex-col bg-gray-300 w-full items-center justify-center rounded-lg shadow-box">
                        <Camera strokeWidth={1.3} />
                        <span>
                            No image
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col mt-2">
                <div className='flex justify-between text-sm lg:text-base gap-1'>
                    <div className='font-medium flex-none'>
                        <span>{carData.nameOfTheCar}</span>
                    </div>
                    <div className='truncate ...'>
                        <span>
                            {carData.model}
                        </span>
                    </div>
                </div>
                <div className='-mt-1 text-sm lg:text-base'>
                    <span>
                        {carData.licensePlate}
                    </span>
                </div>
            </div>
        </div>
    )
}