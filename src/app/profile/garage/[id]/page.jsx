"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function ViewCarPage() {
    const { id } = useParams();

    const [car, setCar] = useState('');

    const fetchData = () => {
        fetch('/api/profile/garage?_id=' + id).then(res => {
            res.json().then(searchedCar => {
                const car = searchedCar.find(car => car._id === id);
                setCar(car);
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <section>
            <div>
                SHOW
            </div>
            <div>
                {car._id}
            </div>
            <div>
                {car.nameOfTheCar}
            </div>
            <div>
                {car.notes?.length}
            </div>
        </section>
    )
}