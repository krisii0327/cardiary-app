export default function SectionHeaders({mainHeader, subHeader, icon}) {
    return (
        <div className="flex items-center justify-center pt-8">
            <div className="flex items-center">
                {icon}
                <div className="flex flex-col">
                    <span className="text-gray-600 uppercase text-xl">
                        {mainHeader}
                    </span>
                    <span className="text-primary italic font-bold text-2xl leading-3">
                        {subHeader}
                    </span>
                </div>
            </div>
        </div>
    )
}