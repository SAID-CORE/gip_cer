export default function LoaderDKW() {
    return (
        <div id={"loader"}
             className={"flex justify-center items-center flex-grow"}>
            {/*<img src={"/assets/Delta_spinner.png"} alt={"Loading..."}  className={"w-1/12 mx-auto"}/>*/}
            <svg
                id="bulb-svg"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="196px"
                height="196px"
                viewBox="0 0 196 196"
                enableBackground="new 0 0 196 196"
                xmlSpace="preserve"
                className="bulb-animation"
            >
                <g id="bulb">
                    <path
                        id="bulb_body"
                        fill="var(--primary)"
                        stroke="var(--primary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        d="M138,86.465 c0-22.284-18.131-40.348-40.5-40.348c-22.367,0-40.5,18.064-40.5,40.348c0,13.2,6.363,24.918,16.201,32.279v12.91 c0,1.781,1.449,3.229,3.238,3.229h42.12c1.789,0,3.24-1.445,3.24-3.229v-12.91C131.637,111.384,138,99.665,138,86.465z"
                    />
                    <g id="sockel">
                        <path
                            fill="gray"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            d="M119.013,139.598 c0,1.803-1.468,3.266-3.276,3.266H79.689c-1.81,0-3.276-1.463-3.276-3.266l0,0c0-1.805,1.468-3.267,3.276-3.267h36.046 C117.545,136.331,119.013,137.793,119.013,139.598L119.013,139.598z"
                        />
                        <path
                            fill="gray"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            d="M119.013,146.128 c0,1.804-1.468,3.267-3.276,3.267H79.689c-1.81,0-3.276-1.463-3.276-3.267l0,0c0-1.804,1.468-3.267,3.276-3.267h36.046 C117.545,142.861,119.013,144.324,119.013,146.128L119.013,146.128z"
                        />
                        <path
                            fill="gray"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            d="M119.013,152.659 c0,1.804-1.468,3.267-3.276,3.267H79.689c-1.81,0-3.276-1.463-3.276-3.267l0,0c0-1.804,1.468-3.267,3.276-3.267h36.046 C117.545,149.395,119.013,150.855,119.013,152.659L119.013,152.659z"
                        />
                        <path
                            fill="gray"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            d="M119.013,159.191 c0,1.803-1.468,3.266-3.276,3.266H79.689c-1.81,0-3.276-1.463-3.276-3.266l0,0c0-1.805,1.468-3.267,3.276-3.267h36.046 C117.545,155.926,119.013,157.389,119.013,159.191L119.013,159.191z"
                        />
                        <path
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            d="M89.111,168.988c0,4.093,3.851,7.41,8.602,7.41 c4.75,0,8.603-3.317,8.603-7.41"
                        />
                        <path
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            d="M81.116,162.457v3.266 c0,1.805,1.467,3.267,3.275,3.267h4.72h17.203h4.293c1.809,0,3.275-1.464,3.275-3.267v-3.266"
                        />
                    </g>
                    <path
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        d="M75,89.781v2.427v6.953 l13,12.769v22.75"
                    />
                    <path
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        d="M107,134.68v-22.75 l13-12.769v-6.953v-2.427"
                    />
                    <path
                        id="glow"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        d="M120,89.802 c0,3.003-2.52,5.438-5.625,5.438c-3.107,0-5.625-2.435-5.625-5.438c0,3.003-2.52,5.438-5.625,5.438 c-3.107,0-5.625-2.435-5.625-5.438c0,3.003-2.519,5.438-5.625,5.438s-5.625-2.435-5.625-5.438c0,3.003-2.519,5.438-5.625,5.438 c-3.105,0-5.625-2.435-5.625-5.438"
                    />
                </g>
                <g id="licht">
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="151.088"
                        y1="90.5"
                        x2="170"
                        y2="90.5"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="25"
                        y1="90.5"
                        x2="43.912"
                        y2="90.5"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="135.392"
                        y1="128.327"
                        x2="148.765"
                        y2="141.677"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="46.234"
                        y1="39.322"
                        x2="59.607"
                        y2="52.673"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        strokeOpacity="0"
                        x1="97.5"
                        y1="143.996"
                        x2="97.5"
                        y2="162.876"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="97.5"
                        y1="18.124"
                        x2="97.5"
                        y2="37.004"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="59.607"
                        y1="128.327"
                        x2="46.234"
                        y2="141.677"
                    />
                    <line
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        x1="148.765"
                        y1="39.322"
                        x2="135.392"
                        y2="52.672"
                    />
                </g>
            </svg>

        </div>
    )
}
