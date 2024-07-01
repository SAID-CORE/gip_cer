'use client'
import React from "react";
import {Carousel} from "react-responsive-carousel";

export default function CarouselComponent({items}) {
    return (
        <Carousel showArrows dynamicHeight infiniteLoop useKeyboardArrows centerMode showStatus={false}
                  showIndicators={false} showThumbs={false}
                  id={"carousel"}>
            {items.map((item, i) =>
                <div key={i} className={"flex flex-col justify-center items-center"}>

                    <div className={"bg-white text-tertiary aspect-square mb-5 rounded-full text-2xl"}>{i + 1}</div>
                    <div
                        className={"w-3/4 mx-auto border z-20 border-white rounded-md p-4 flex justify-center items-center text-center"}>
                        {item.cardDetailedText}
                    </div>
                </div>)
            }
        </Carousel>
    )
}

