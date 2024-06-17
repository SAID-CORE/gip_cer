"use client"
import Typography from "@mui/material/Typography";
import {theme} from "@/MuiTheme";
import {Select, ThemeProvider} from "@mui/material";
import {useState} from "react";
import SwitchSelector from "react-switch-selector";
import FirstIcon from "@/app/components/icons/FirstIcon";
import SecondIcon from "@/app/components/icons/SecondIcon";
import ThirdIcon from "@/app/components/icons/ThirdIcon";
import Info from "@/app/components/icons/Info";
import MenuItem from "@mui/material/MenuItem";

export default function ResulPage() {
    const [variableType, setVariableType] = useState("efficiency")
    const [efficiencyRate, setEfficiencyRate] = useState("20%")
    const [communitySize, setCommunitySize] = useState("50ppl")
    const [data, setData] = useState(
        {
            "50ppl": {
                "20%": [["1.700€", "7.000€"],
                    ["20€", "320€"],
                    ["4", "15"],
                    ["6.720", "78.000"],
                ],
                "50%": [["2.000€", "8.000€"],
                    ["32€", "420€"],
                    ["5", "21"],
                    ["7.020", "80.000"],
                ],
                "100%": [["2.500€", "9.000€"],
                    ["35€", "470€"],
                    ["6", "35"],
                    ["8.000", "90.000"],
                ]
            },
            "150ppl": {
                "20%": [["1.705€", "7.005€"],
                    ["25€", "325€"],
                    ["5", "15"],
                    ["6.725", "78.005"],
                ],
                "50%": [["2.005€", "8.005€"],
                    ["35€", "425€"],
                    ["7", "25"],
                    ["7.025", "80.005"],
                ],
                "100%": [["2.505€", "9.005€"],
                    ["35€", "475€"],
                    ["8", "38"],
                    ["8.005", "90.005"],
                ]
            },
            "300ppl": {
                "20%": [["1.708€", "7.008€"],
                    ["28€", "328€"],
                    ["8", "18"],
                    ["6.728", "78.008"],
                ],
                "50%": [["2.008€", "8.008€"],
                    ["38€", "428€"],
                    ["10", "28"],
                    ["7.028", "80.008"],
                ],
                "100%": [["2.508€", "9.008€"],
                    ["41€", "481€"],
                    ["11", "41"],
                    ["8.008", "90.008"],
                ]
            }
        }
    )
    const options = [
        {
            label: "Valutazione per efficienza",
            value: "efficiency",
            selectedBackgroundColor: "var(--tertiary)",
        },
        {
            label: "Valutazione per volume comunità",
            value: "volume",
            selectedBackgroundColor: "var(--tertiary)",
        },
    ];

    const efficiencyRateOptions = [{
        label: "Consumo del 20% di energia",
        value: "20%",
    },
        {
            label: "Consumo del 50% di energia",
            value: "50%",
        },
        {
            label: "Consumo del 100% di energia",
            value: "100%",
        },]
    const communitySizeOptions = [{
        label: "Comunità di 50 utenti",
        value: "50ppl",
    },
        {
            label: "Comunità di 150 utenti",
            value: "150ppl",
        },
        {
            label: "Comunità di 300 utenti",
            value: "300ppl",
        },]

    const onChangeSwitch = (newValue) => {
        // console.log(newValue);
        setVariableType(newValue)
    };
    return (
        <ThemeProvider theme={theme}>
            <main className="flex min-h-screen flex-col bg-white ">
                <div className={"bg-primary flex justify-between  items-center md:px-14 lg:px-28"} id={"breadcrumb"}>

                    <span className={"scale-50 md:scale-5 lg:scale-100"}><FirstIcon color={"var(--tertiary)"}/></span>
                    <hr className={"flex-grow"}
                        style={{borderColor: "var(--tertiary)"}}/>
                    <span className={"scale-50 md:scale-75 lg:scale-100"}><SecondIcon
                        color={"var(--tertiary)"}/></span>
                    <hr className={"flex-grow"} style={{borderColor: "var(--tertiary)"}}/>
                    <span className={"scale-50 md:scale-75 lg:scale-100"}> <ThirdIcon
                        color={"var(--tertiary)"}/></span>
                </div>
                <div className={"px-28 mt-8"}>
                    <Typography variant="h4" color={"primary"}
                                sx={{fontWeight: "bold", textAlign: "center", my: 4}}>Valutazione economico-finanziaria
                        per la
                        nascita della tua
                        Comunità di
                        energia</Typography>
                    <p>Ti presentiamo due diverse visualizzazioni dei piani economico-finanziari:</p>
                    <ol className={""}>
                        <li>
                            1. La prima visualizzazione riguarda il volume della comunità, con variabili legate alla
                            percentuale di consumo di energia
                        </li>
                        <li>
                            2. La seconda visualizzazione riguarda il consumo di energia, con la variabile del volume
                            della
                            comunità.
                        </li>
                    </ol>
                    <div className={"my-12 resultSwitchWrapper"}>
                        <SwitchSelector
                            onChange={onChangeSwitch}
                            options={options}
                            initialSelectedIndex={variableType}
                            backgroundColor={"var(--primary)"}
                            fontColor={"#FFFFFF"}
                        />
                    </div>

                    {
                        variableType === "volume" &&

                        <div className="resultTable byVolume">

                            <table>
                                <thead>
                                <tr className={"community-header"}>
                                    <th colSpan={2} className={"text-start"}>
                                        <p>VARIABILE EFFICIENZA</p>
                                        <Select value={communitySize} onChange={(e) => {
                                            setCommunitySize(e.target.value)
                                        }}>
                                            {communitySizeOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                    </th>
                                    <th colSpan={2}>
                                        <div>EFFICIENZA <span className={"font-bold"}>20%</span>
                                        </div>
                                    </th>
                                    <th></th>
                                    <th colSpan={2}>
                                        <div>EFFICIENZA <span className={"font-bold"}>50%</span>
                                        </div>

                                    </th>
                                    <th></th>
                                    <th colSpan={2}>
                                        <div>EFFICIENZA <span className={"font-bold"}>100%</span>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan={2}>INVESTIMENTO NECESSARIO</td>
                                    <td>{data[`${communitySize}`][`20%`][0][0]}</td>
                                    <td>{data[`${communitySize}`][`20%`][0][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`50%`][0][0]}</td>
                                    <td>{data[`${communitySize}`][`50%`][0][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`100%`][0][0]}</td>
                                    <td>{data[`${communitySize}`][`100%`][0][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>RATA DI ACCREDITO</td>
                                    <td>{data[`${communitySize}`][`20%`][1][0]}</td>
                                    <td>{data[`${communitySize}`][`20%`][1][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`50%`][1][0]}</td>
                                    <td>{data[`${communitySize}`][`50%`][1][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`100%`][1][0]}</td>
                                    <td>{data[`${communitySize}`][`100%`][1][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>ANNI RIENTRO</td>
                                    <td>{data[`${communitySize}`][`20%`][2][0]}</td>
                                    <td>{data[`${communitySize}`][`20%`][2][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`50%`][2][0]}</td>
                                    <td>{data[`${communitySize}`][`50%`][2][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`100%`][2][0]}</td>
                                    <td>{data[`${communitySize}`][`100%`][2][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>RITORNO IN VENT'ANNI</td>
                                    <td>{data[`${communitySize}`][`20%`][3][0]}</td>
                                    <td>{data[`${communitySize}`][`20%`][3][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`50%`][3][0]}</td>
                                    <td>{data[`${communitySize}`][`50%`][3][1]}</td>
                                    <td></td>
                                    <td>{data[`${communitySize}`][`100%`][3][0]}</td>
                                    <td>{data[`${communitySize}`][`100%`][3][1]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        variableType === "efficiency" &&
                        <div className="resultTable">
                            <table>
                                <thead>
                                <tr className={"community-header"}>
                                    <th colSpan={2} className={"text-start"}>
                                        <p>VARIABILE EFFICIENZA</p>
                                        <Select value={efficiencyRate} onChange={(e) => {
                                            setEfficiencyRate(e.target.value)
                                        }}>
                                            {efficiencyRateOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                    </th>
                                    <th colSpan={2}>
                                        <div>COMUNITÀ DI ENERGIA DI <span className={"font-bold"}>N° 50 UTENTI</span>
                                        </div>
                                    </th>
                                    <th></th>
                                    <th colSpan={2}>
                                        <div>COMUNITÀ DI ENERGIA DI <span className={"font-bold"}>N° 150 UTENTI</span>
                                        </div>

                                    </th>
                                    <th></th>
                                    <th colSpan={2}>
                                        <div>COMUNITÀ DI ENERGIA DI <span className={"font-bold"}>N° 300 UTENTI</span>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                    <th></th>
                                    <th className={"bg-gray-100"}>CONSUMATORE</th>
                                    <th className={"bg-gray-100"}>PRODUTTORE</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan={2}>INVESTIMENTO NECESSARIO</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][0][0]}</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][0][1]}</td>
                                    <td></td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][0][0]}</td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][0][1]}</td>
                                    <td></td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][0][0]}</td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][0][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>RATA DI ACCREDITO</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][1][0]}</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][1][1]}</td>
                                    <td></td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][1][0]}</td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][1][1]}</td>
                                    <td></td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][1][0]}</td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][1][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>ANNI RIENTRO</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][2][0]}</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][2][1]}</td>
                                    <td></td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][2][0]}</td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][2][1]}</td>
                                    <td></td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][2][0]}</td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][2][1]}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>RITORNO IN VENT'ANNI</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][3][0]}</td>
                                    <td>{data["50ppl"][`${efficiencyRate}`][3][1]}</td>
                                    <td></td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][3][0]}</td>
                                    <td>{data["150ppl"][`${efficiencyRate}`][3][1]}</td>
                                    <td></td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][3][0]}</td>
                                    <td>{data["300ppl"][`${efficiencyRate}`][3][1]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    <div id={"disclaimer"} className={"p-10 rounded my-12 text-primary"}>
                        <div className={"flex items-center gap-2 text-sm font-semibold my-2"}>
                            <Info/> LIMITAZIONI DI RESPONSABILITÀ
                        </div>
                        <small>
                            Delta KiloWatt effettua simulazioni economico-finanziarie preliminari considerando
                            l’eventuale contributo di sovvenzioni pubbliche, incentivi e detrazioni fiscali. Le stime
                            non tengono conto di eventuali ulteriori vincoli fissati dalle norme che disciplinano il
                            riconoscimento degli incentivi, delle sovvenzioni pubbliche e delle detrazioni fiscali, i
                            quali saranno valutati, e saranno soggetti a controlli, da parte degli Enti preposti a norma
                            di Legge esclusivamente nell'ambito dei procedimenti di ammissione e di controllo, da
                            svolgersi in conformità alle discipline di riferimento. I risultati di Delta KiloWatt non
                            potranno in alcun modo essere utilizzati al fine di vantare pretesa alcuna nei confronti di
                            tali Enti anche riguardo gli esiti dei suddetti procedimenti, né essere intesi come verifica
                            della sussistenza dei requisiti all'accesso a tali incentivi, sovvenzioni e detrazioni
                            fiscali, e neanche configurare aspettativa alcuna in tal senso.
                        </small>
                    </div>
                </div>

            </main>
        </ThemeProvider>
    )
}