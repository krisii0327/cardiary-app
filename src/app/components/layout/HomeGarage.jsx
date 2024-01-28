"use client"
import CarItem from "./HomeGarage/CarItem";
import SearchBar from "./Garage/SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/loading";

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
        fetch('/api/homegarage').then(res => {
            res.json().then(cars => {
                const data = cars.filter(car => car.nameOfTheCar.toLowerCase().includes(searchInputText.toLowerCase()));
                setCars(data);
            });
        });
    }

    return (
        <section>
            <div className="flex flex-col justify-center mx-4">
                {!carsFetched && (
                    <Loading />
                )}
                {carsFetched && (
                    <SearchBar searchHandler={handleChange} searchText={searchInputText} showMore={false}/>
                )}
                {cars.length == 0 && carsFetched && (
                    <div className="text-slate-500 text-xl font-semibold mt-6">
                        We found nothing in our system! Please try it again later!
                    </div>
                )}
                {cars.length > 0 && carsFetched &&  (
                    <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                        {cars.map(car => (
                            <Link href={"/garage/" + car._id} key={car._id}>
                                <CarItem carData={car}/>
                            </Link>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </section>
    )
}