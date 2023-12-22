export default function CarItem() {
    return (
        <div className="hover:scale-90 transition duration-500">
            <div className="rounded-xl">
                <img src={'/mcqueen.jpg'} className="rounded-xl shadow-box"></img>
            </div>
            <div className="flex flex-col mt-2 mb-2">
                <div className='flex justify-between text-sm lg:text-base gap-1'>
                    <div className='font-medium flex-none'>McQueen</div>
                    <div className='truncate ...'>Dodge Viper</div>
                </div>
                <div className='-mt-1 text-sm lg:text-base'>CAR-001</div>
            </div>
        </div>
    )
}