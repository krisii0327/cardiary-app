"use client"
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { TbBrandTabler } from "react-icons/tb";
import { IoColorFillOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import NoteMenuForm from "@/app/components/layout/Garage/NoteMenuForm";
import moment from "moment";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ViewCarPage() {
    const session = useSession();
    const {status} = session;
    const email = session?.data?.userCredentials?.email;
    const { id } = useParams();

    const [car, setCar] = useState('');
    const [carLoaded, setCarLoaded] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [listOfImages, setListOfImages] = useState('');

    const [showCreateNoteMenu, setShowCreateNoteMenu] = useState(false);
    const [showEditNoteMenu, setShowEditNoteMenu] = useState(false);
    const [editableNote, setEditableNote] = useState('');
    
    const fetchData = () => {
        fetch('/api/profile/garage?_id=' + id).then(res => {
            res.json().then(pickedCar => {
                const car = pickedCar.find(car => car._id === id);
                setCar(car);
                setCarLoaded(true);
                setListOfImages(car?.images);
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const notes = car?.notes?.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    const allCostForTheCar = () => {
        let cost = 0;
        car?.notes?.forEach(note => {
            cost += note.price;
        });
        return cost;
    }

    async function handleCreateNote(ev, data) {
        ev.preventDefault();
        data = {email, id, ...data}
        const createPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/garage/note', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if(response.ok) {
                resolve();
                fetchData();
            } else {
                reject();
            }

            setShowCreateNoteMenu(false);
        })

        await toast.promise(createPromise, {
            loading: 'Creating a note...',
            success: 'Note created.',
            error: 'Oops, something went wrong.',
        })
    }

    async function handleEditNote(ev, data) {
        ev.preventDefault();
        const note_id = editableNote._id;
        data = {car_id: id, note_id, ...data}
        const editPromise = new Promise(async (resolve, reject) => {
            const response =  await fetch('/api/profile/garage/note', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if(response.ok) {
                resolve();
                fetchData();
            } else {
                reject();
            }
            
            setEditableNote('');
            setShowEditNoteMenu(false);
        })

        await toast.promise(editPromise, {
            loading: 'Edit note...',
            success: 'Note edited.',
            error: 'Oops, something went wrong.',
        })
    }

    async function handleDeleteNote(ev, note_id) {
        ev.preventDefault();
        const deletePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/garage/note?_id=' + note_id, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(id),
            });

            if(response.ok) {
                resolve();
                fetchData();
            } else {
                reject();
            }
        })

        await toast.promise(deletePromise, {
            loading: 'Deleting note...',
            success: 'Note deleted',
            error: 'Oops, something went wrong',
        })
    }

    const handleEditNoteForm = (note) => {
        setShowEditNoteMenu(true);
        setEditableNote(note);
    } 

    const handleBack = () => {
        setShowCreateNoteMenu(false);
        setShowEditNoteMenu(false);
    }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? listOfImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    
    const nextSlide = () => {
        const isLastSlide = currentIndex === listOfImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    if(status === 'loading') {
        return <Loading />
    } else if (status === 'unauthenticated' && !carLoaded) {
        return redirect('/login');
    }

    return (
        <section>
            <div className="flex justify-between">
                <div className="flex items-center gap-2 text-xl">
                    <span className="flex gap-1 items-center">
                        <GoSearch className="w-6 h-6"/>
                        Selected car:
                    </span>
                    <span className="font-semibold">
                        {car.nameOfTheCar}
                    </span>
                </div>
                <Link href='/profile/garage/' className="border border-gray-500 font-semibold rounded-lg px-2 py-1 hover:bg-gray-200">
                        Back
                </Link>
            </div>
            <div>
                <div className="flex justify-between gap-2 md:w-1/2 xl:w-1/3 mt-1 border-y border-gray-400 p-0.5">
                    <div className="flex gap-1 items-center">
                        <TbBrandTabler />
                        {car.licensePlate}
                    </div>
                    <div className="flex gap-1 items-center">
                        <CiCalendarDate className="w-5 h-5"/>
                        {car.year}
                    </div>
                    <div className="flex gap-1 items-center">
                        <IoLayersOutline />
                        {car.model}
                    </div>
                    <div className="flex gap-1 items-center">
                        <IoColorFillOutline />
                        {car.color}
                    </div>
                </div>
            </div>

            {/* car infos */}
            <div className="flex flex-col md:flex-row mt-6 gap-2 mx-auto">
                <div className="md:w-1/2 flex flex-col justify-center items-center">
                    <div className="bg-gray-200 rounded-lg sm:w-96 sm:h-64 w-72 h-52 relative">
                        {car?.images?.length > 0 && ( 
                            <Image src={listOfImages[currentIndex]} alt={"Photo of " + car?.nameOfTheCar} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg" priority></Image>
                        )}
                        {car?.images?.length == 0 && (
                            <span className="flex h-full justify-center items-center">No Image</span>
                        )}
                    </div>
                    <div className="flex flex-row justify-around w-full mt-2">
                        <div><ArrowLeft onClick={ev => prevSlide()} size={30} color="gray" className="hover:scale-110 bg-gray-100 rounded-lg w-10 border border-gray-300"/></div>
                        <div><ArrowRight onClick={ev => nextSlide()} size={30} color="gray" className="hover:scale-110 bg-gray-100 rounded-lg w-10 border border-gray-300"/></div>
                    </div>
                </div>
                <div className="md:w-1/2 flex grow flex-col">
                    <div className="h-full flex flex-col p-2 gap-2">
                        <div className="flex items-center gap-1">
                            <IoInformationCircleOutline className="w-5 h-5"/>
                            <span>Info: {car.description}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MdOutlineSpeakerNotes className="ml-0.5"/>
                            <span>Notes: {car?.notes?.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TbReportMoney className="w-5 h-5"/>
                            <span>All cost of services: {allCostForTheCar()}$</span>
                        </div>
                        <span>Last registreted kilometer:</span>
                    </div>
                </div>
            </div>

            {/* note section */}
            <div className="mt-6">
                {/* note menu */}
                <div className="flex items-center">
                    {showCreateNoteMenu && (
                        <NoteMenuForm handleNoteEvent={handleCreateNote} handleBack={handleBack}/>
                    )}
                    {showEditNoteMenu && (
                        <NoteMenuForm noteData={editableNote} handleNoteEvent={handleEditNote} handleBack={handleBack}/>
                    )}
                    <span className="flex gap-1 items-center">
                        <MdOutlineMessage />
                        Notes: {car.notes?.length}
                    </span>
                    <div onClick={() => setShowCreateNoteMenu(true)} className="ml-4 border border-gray-400 px-1 py-0.5 font-semibold rounded-lg hover:bg-gray-200 cursor-pointer">Create a new note</div>
                </div>

                {/* note listing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
                        {notes && notes.map(note => (
                            <div key={note._id} className="flex w-full bg-gray-100 rounded-lg p-1 border border-gray-400 hover:scale-[1.02] transition duration-500">
                                <div className="flex w-full">
                                    <div className="flex grow mx-2 bg-red-300">
                                        <div className="grid grid-cols-3 w-full items-center justify-between">
                                            <div>{note.short_desc}</div>
                                            <div className="text-center">{note.category}</div>
                                            <div className="flex gap-1 items-center justify-end">
                                                <CiCalendarDate className="w-6 h-6"/>
                                                {moment(note.date).format("YYYY-MM-DD")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center gap-2">
                                        <div onClick={ev => handleEditNoteForm(note)} className="flex p-2 border border-gray-500 rounded-lg bg-green-400 cursor-pointer">
                                            <GrEdit />
                                        </div>
                                        <div onClick={ev => handleDeleteNote(ev, note._id)} className="flex p-2 border border-gray-500 rounded-lg bg-red-400 cursor-pointer">
                                            <GoTrash />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </section>
    )
}