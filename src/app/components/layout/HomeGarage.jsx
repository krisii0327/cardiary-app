"use client"
import CarItem from "./HomeGarage/CarItem";
import SearchBar from "./Garage/SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomeGarage() {
    const [searchInputText, setSearchInputText] = useState('');
    const [carsFetched, setCarsFetched] = useState(false);
    const [cars, setCars] = useState([]);

    const fetchData = () => {
        fetch('/api/homegarage').then(res => {
            res.json().then(cars => {
                setCars(cars);
                setCarsFetched(true);
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleChange = (searchInputText) => {
        setSearchInputText(searchInputText);
        fetch('/api/garage').then(res => {
            res.json().then(cars => {
                const data = cars.filter(car => car.nameOfTheCar.toLowerCase().includes(searchInputText.toLowerCase()));
                setCars(data);
            });
        });
    }

    return (
        <section>
            <div className="flex flex-col justify-center mx-4">
                {/* <SearchBar searchHandler={handleChange} searchText={searchInputText} showCarMenuForm={() => setShowCarMenu(true)}/> */}
                    {cars.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {cars.map(car => (
                                <Link href={"/garage/" + car._id} key={car._id}>
                                    <CarItem carData={car}/>
                                </Link>
                            ))}
                        </div>
                    )}
            </div>
        </section>
    )
}