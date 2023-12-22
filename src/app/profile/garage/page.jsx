"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import GarageCarItem from "@/app/components/layout/Garage/GarageCarItem";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import SearchBar from "@/app/components/layout/Garage/SearchBar";

export default function GaragePage() {
    const session = useSession();
    const {status} = session;
    const email = session?.data?.userCredentials?.email;

    const [nameOfTheCar, setNameOfTheCar] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [description, setDescription] = useState('');

    const [carsFetched, setCarsFetched] = useState(false);
    const [ownCars, setOwnCars] = useState([]);

    const [searchInputText, setSearchInputText] = useState('');
    const [showCreateCarMenu, setShowCreateCarMenu] = useState(false);

    const fetchData = () => {
        fetch('/api/profile/garage').then(res => {
            res.json().then(ownCars => {
                setOwnCars(ownCars);
                setCarsFetched(true);
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleChange = (searchInputText) => {
        setSearchInputText(searchInputText);
        fetch('/api/profile/garage').then(res => {
            res.json().then(ownCars => {
                const data = ownCars.filter(car => car.nameOfTheCar.toLowerCase().includes(searchInputText.toLowerCase()));
                setOwnCars(data);
            });
        });
    }

    async function handleCreateCar(ev, data) {
        ev.preventDefault();
        data = {email, ...data}
        const createPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/garage', {
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

            setShowCreateCarMenu(false);
            setNameOfTheCar('');
            setYear('');
            setModel('');
            setLicensePlate('');
            setDescription('');
        })

        await toast.promise(createPromise, {
            loading: 'Creating a vehicle...',
            success: 'Vehicle created.',
            error: 'Oops, something went wrong.',
        })
    }

    async function handleDeleteCar(id) {
        const createPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/garage?_id=' + id, {
                method: 'DELETE',
            });

            if(response.ok) {
                resolve();
                fetchData();
            } else {
                reject();
            }
        })

        await toast.promise(createPromise, {
            loading: 'Deleting a vehicle...',
            success: 'Vehicle deleted',
            error: 'Oops, something went wrong',
        })
    }

    if(status === 'loading') {
        return <Loading />
    } else if (status === 'unauthenticated' && !carsFetched) {
        return redirect('/login');
    }

    return (
        <section className="items-center">
            {showCreateCarMenu && (
                <div className="fixed bg-black/70 flex inset-0 items-center justify-center z-20">
                    <div className="flex flex-col rounded-lg shadow-box gap-2 p-4 bg-white">
                        <form onSubmit={ev => handleCreateCar(ev, {nameOfTheCar, licensePlate, year, model, description})}>
                            <SectionHeaders subHeader={"Creating a new car"} />
                            <div className="block w-80 mt-8">
                                <label>Name of the car</label>
                                <input type="text" value={nameOfTheCar} onChange={ev => setNameOfTheCar(ev.target.value)}/>
                                <label>Model</label>
                                <input type="text" value={model} onChange={ev => setModel(ev.target.value)}/>
                                <label>Year</label>
                                <input type="text" value={year} onChange={ev => setYear(ev.target.value)}/>
                                <label>License Plate</label>
                                <input type="text" value={licensePlate} onChange={ev => setLicensePlate(ev.target.value)}/>
                                <label>Description</label>
                                <input type="text" value={description} onChange={ev => setDescription(ev.target.value)}/>
                            </div>
                            <div className="flex grow justify-between gap-6">
                                <button type="submit" className="button-black-full">Create</button>
                            </div>
                        </form>
                        <div>
                            <button className="button-white-full" onClick={() => setShowCreateCarMenu(false)}>Cancel</button>     
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col sm:mx-4 lg:mx-16">
                <SearchBar searchHandler={handleChange} searchText={searchInputText} showCreateCarMenuForm={() => setShowCreateCarMenu(true)}/>
                {ownCars.length > 0 && (
                    <div>
                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-5">
                            {ownCars.map(car => (
                                <GarageCarItem key={car._id} car={car} onDelete={() => handleDeleteCar(car._id)}/>
                            ))}
                        </div>
                    </div>
                )}
                {ownCars.length === 0 && (
                    <div>
                        <SectionHeaders subHeader={"We don't found any cars in the garage."} className="mt-4 flex justify-center" />
                    </div>
                )}
            </div>
        </section>
    )
}