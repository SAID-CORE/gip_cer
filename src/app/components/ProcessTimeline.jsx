import CarouselComponent from "@/app/components/Carousel"

const items = [
    {
        cardDetailedText: 'Investimento necessario',
    },
    {
        cardDetailedText: 'Rata di accredito',
    },
    {
        cardDetailedText: 'Anni di rientro nell\'investimento',
    },
    {
        cardDetailedText: 'Totale di accredito in 20 anni',
    },
];

export default function ProcessTimeline() {
    return (<>
            <div className={"md:hidden w-full mx-auto py-32"}>
                <CarouselComponent items={items}/>
            </div>

            <div className={"hidden md:block"}>
                <div className={"relative w-full my-14 flex justify-center items-center"}>
                    <hr className={"w-9/12  absolute top-0"}/>
                    <div className={" w-full flex justify-between  absolute bottom-1/8"}>
                        {items.map((item, index) =>
                            <div key={index} className={"w-full flex my-3 justify-center "}>
                                <div
                                    className={"border border-white w-2/12 rounded-full aspect-square flex justify-center items-center bg-white text-tertiary font-bold"}>
                                    {index + 1}
                                </div>
                                <hr/>
                            </div>
                        )
                        }
                    </div>
                </div>

                <div className={"flex justify-between gap-14 mb-6"}>
                    {items.map((item, index) =>
                        <div key={index}
                             className={"border border-white rounded-md p-4 w-1/4 flex justify-center items-center text-center"}>
                            {item.cardDetailedText}
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}
