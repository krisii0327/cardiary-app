import Link from "next/link";

export default function Hero() {
    return (
        <section className="flex items-center justify-center gap-8 border-b border-gray-400 py-8 md:py-12 flex-col md:flex-row mx-4">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl md:text-4xl font-semibold text-primary italic">Make your own car notes!</h1>
                <p className="text-lg md:text-xl mt-2 text-gray-800 leading-4">
                    Unleash the Power of Precision: Drive, Maintain, Remember with Entries!
                </p>
                <div className="flex gap-8">
                    <div className="button-black mt-2 cursor-pointer">
                        <span>Show more</span>
                    </div>
                    <Link href={'/garage'} className="button-white mt-2">
                        <span>Garage</span>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <img src={'/car.png'} alt={'car'} className="h-36 md:h-48"></img>
            </div>
        </section>
    )
}