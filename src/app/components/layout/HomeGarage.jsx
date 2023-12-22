import CarItem from "./HomeGarage/CarItem";

export default function HomeGarage() {
    return (
        <section>
            <div className="flex justify-center mx-4">
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                        <CarItem />
                        <CarItem />
                        <CarItem />
                        <CarItem />
                        <CarItem />
                        <CarItem />
                        <CarItem />
                    </div>
            </div>
        </section>
    )
}