export default function Footer() {
    return (
        <footer className={"bg-primary "}>
            <div
                className={"flex flex-col md:flex-row justify-between items-start md:items-center gap-3 w-10/12 mx-auto"}>
                <img src={"/assets/Delta_KiloWatt_logo.png"} alt={"Delta Kilowatt"}/>
                <img src={"/assets/numero-verde1.webp"} alt={"Numero verde: 800 68 48 85"} className={"mt-8"}/>
                <div className={"mt-6 mb-5 w-full  md:w-1/3"}>
                    <h6 className={"my-3 font-semibold text-sm text-gray-400"}>SEGUICI SU FACEBOOK</h6>
                    <iframe name="f20a70043ec2f7723"
                        // width="500px" height="1000px"
                            data-testid="Delta Kilowatt - Facebook" title="Delta Kilowatt - Facebook"
                            frameBorder="0" allowTransparency="true" allowFullScreen="true" scrolling="no"
                            allow="encrypted-media"
                            src="https://www.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df11387fab14bb5172%26domain%3Ddeltakilowatt.it%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fdeltakilowatt.it%252Ffe174bd2a89102d6b%26relation%3Dparent.parent&amp;container_width=355&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fdeltakilowatt.it&amp;locale=it_IT&amp;sdk=joey&amp;show_facepile=true&amp;show_posts=false&amp;small_header=false&amp;width=500"
                            style={{
                                border: "none", maxWidth: "100%",
                                // width: "355px", height: "130px"
                            }}
                    ></iframe>
                </div>

            </div>
        </footer>
    )
}