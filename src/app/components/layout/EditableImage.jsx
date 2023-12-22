import Image from "next/image"

export default function EditableImage({image}) {
    return (
        <>
        <div className="flex flex-col gap-2 sm:mt-8">
            <div className="bg-gray-100 flex justify-center items-center h-32 w-32 border border-black rounded-lg object-cover">
                {image && (
                    <img src={image} alt="avatar" className="object-fill w-full rounded-lg"/>
                )}
                {!image && (
                    <span>No Image</span>
                )}
            </div>
            <button className="button-black text-sm items-center sm:text-normal">
                Edit Image
            </button>
        </div>
        </>
    )
}