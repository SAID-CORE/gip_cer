'use client'
import React from "react";
import {Carousel} from "react-responsive-carousel";

export default function CarouselComponent({items}) {
    return (
        <Carousel showArrows dynamicHeight infiniteLoop useKeyboardArrows centerMode showStatus={false}
                  showIndicators={false} showThumbs={false}
                  id={"carousel"}>
            {items.map((item, i) =>
                <div key={i}
                     className={"w-3/4 mx-auto border z-20 border-white rounded-md p-4 flex justify-center items-center text-center"}>
                    {item.cardDetailedText}
                </div>)
            }
        </Carousel>
    )
}

