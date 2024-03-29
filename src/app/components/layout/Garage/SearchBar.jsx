import Link from "next/link"
import CreateCarMenuForm from "@/app/components/layout/Garage/CreateCarMenuForm";

export default function SearchBar({searchHandler, searchInputText, showCarMenuForm, showMore = true}) {
    return (
        <>
            <div className="flex justify-between gap-2">
                <input type="search" className="hidden sm:flex" placeholder="Search..." value={searchInputText} onChange={ev => searchHandler(ev.target.value)}/>
                <div className="flex gap-2 items-center justify-between w-full">
                    {showMore && (
                        <>
                        <CreateCarMenuForm showCarMenuForm={showCarMenuForm}/>
                        <Link href='/' className="border border-gray-500 font-semibold rounded-lg px-4 py-2">
                            Back
                        </Link> 
                        </>
                    )}
                </div>
            </div>
            <input type="search" className="flex sm:hidden mt-2" placeholder="Search..." value={searchInputText} onChange={ev => searchHandler(ev.target.value)}/>
        </>
    )
}