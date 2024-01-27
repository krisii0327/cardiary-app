"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import GarageCarItem from "@/app/components/layout/Garage/GarageCarItem";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import SearchBar from "@/app/components/layout/Garage/SearchBar";
import CarMenuForm from "@/app/components/layout/Garage/CarMenuForm";

export default function GaragePage() {
    const session = useSession();
    const {status} = session;
    const email = session?.data?.userCredentials?.email;

    const [carsFetched, setCarsFetched] = useState(false);
    const [ownCars, setOwnCars] = useState([]);
    const [searchInputText, setSearchInputText] = useState('');

    const [showCarMenu, setShowCarMenu] = useState(false);
    const [editCarMenu, setEditCarMenu] = useState(false);
    const [editableCar, setEditableCar] = useState('');

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

            setShowCarMenu(false);
        })

        await toast.promise(createPromise, {
            loading: 'Creating a vehicle...',
            success: 'Vehicle created.',
            error: 'Oops, something went wrong.',
        })
    }

    async function handleEditCar(ev, data) {
        ev.preventDefault();
        data = {email, ...data}
        const editPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/garage', {
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

            setEditCarMenu(false);
        })

        await toast.promise(editPromise, {
            loading: 'Edit vehicle...',
            success: 'Vehicle edited.',
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

    const handleBack = () => {
        setShowCarMenu(false);
        setEditCarMenu(false);
    }

    const value = 6;

    if(status === 'loading') {
        return <Loading />
    } else if (status === 'unauthenticated' && !carsFetched) {
        return redirect('/login');
    }

    const handleEditCarForm = (car) => {
        setEditCarMenu(true);
        setEditableCar(car);
    }

    return (
        <section className="items-center">
            {showCarMenu && (
                <CarMenuForm handleCarEvent={handleCreateCar} handleBack={handleBack}/>
            )}
            {editCarMenu && editableCar != null && (
                <CarMenuForm carData={editableCar} handleCarEvent={handleEditCar} handleBack={handleBack} />
            )}
            <div className="flex flex-col sm:mx-4 lg:mx-16">
                <SearchBar searchHandler={handleChange} searchText={searchInputText} showCarMenuForm={() => setShowCarMenu(true)}/>
                {ownCars.length > 0 && (
                    <div>
                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-5">
                            {ownCars.map(car => (
                                <GarageCarItem key={car._id} carData={car} onDelete={() => handleDeleteCar(car._id)} onEdit={() => handleEditCarForm(car)}/>
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