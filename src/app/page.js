'use client'

import {useState} from 'react';
import Button from "@mui/material/Button";
import {theme} from "@/MuiTheme";
import {Autocomplete, TextField, ThemeProvider} from "@mui/material";
import ProcessTimeline from "@/app/components/ProcessTimeline";
import {comuniCagliari} from "@/app/utils/MunicipalityList";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";


export default function Home() {
    const router = useRouter()
    const municipalities = comuniCagliari.map((m) => {
        return ({
            label: m,
            value: m
        })
    })

    const [selectedMunicipality, setSelectedMunicipality] = useState(null)
    const [isLoadingData, setIsLoadingData] = useState(false)

    const handleLoadMunicipalityData = (newValue) => {
        setSelectedMunicipality(newValue)
        setIsLoadingData(true)
        setTimeout(() => {
            setIsLoadingData(false)
        }, 5000)
    }

    function handleClick() {
        if (confirm("Coddati")) {
            router.push("/test")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <main className="flex min-h-screen flex-col bg-white">
                <div className={"bg-primary py-32 text-center flex flex-col items-center gap-2"}
                     style={{"clipPath": "polygon(0% 0%, 0 78%, 100% 100%, 100% 0%)"}}>
                    <img src={"/assets/Delta_KiloWatt_logo.png"} alt={"Delta Kilowatt"} className={"w-1/6"}/>
                    <p className={"title text-white text-2xl px-12 mb-6"}>
                        Avvia il simulatore per la valutazione economica delle Comunità di Energie Rinnovabili di Delta
                        KiloWatt
                    </p>
                    <Button variant={"contained"} color={"secondary"} onClick={handleClick}> Avvia ora</Button>
                </div>
                <div className={"md:flex"} id={"simulator"}>
                    <div className={"p-12 flex flex-col justify-start gap-8"}>
                        <h5 className={"text-primary text-3xl font-semibold"}>IL SIMULATORE DELTA KILOWATT</h5>
                        <p>
                            Il Simulatore per la valutazione economica delle Comunità di Energia Rinnovabile
                            è un&apos;applicazione web finalizzata a supportare valutazioni preliminari di tipo
                            energetico,
                            economico e finanziario per la nascita di comunità energetiche rinnovabili (CER) o di gruppi
                            di
                            autoconsumatori di energia rinnovabile che agiscono collettivamente (GAC) in base al quadro
                            legislativo e regolatorio in vigore in Italia. L&apos;applicazione può essere utilizzata
                            gratuitamente previa rilascio dati utili al calcolo.
                        </p>
                        <div>
                            <Button variant={"contained"} color={"secondary"} onClick={handleClick}> Avvia ora</Button>
                        </div>
                    </div>
                    <div className={"w-full"}>
                        <img src={"/assets/Img_LandingPage_1.png"} alt={"Comunità energetiche rinnovabili"}
                             className={"w-full"}/>
                    </div>


                </div>
                <div className={"bg-tertiary flex flex-col justify-between items-center text-white p-12 gap-2"}>
                    <h5 className={"text-3xl font-semibold"}> IL RISULTATO DELLA SIMULAZIONE</h5>
                    <p className={"text-center"}>A seconda del volume di persone che aderiranno alla Comunità di Energia
                        Rinnovabile</p>
                    <ProcessTimeline></ProcessTimeline>
                    {/*<Button variant={"contained"} color={"secondary"} onClick={handleClick}> Avvia ora</Button>*/}

                </div>
                <div className={"p-12 flex flex-col items-center"}>
                    <h5 className={"text-primary text-3xl font-semibold text-center"}>L&apos;ATTUALE ANDAMENTO DELLO
                        SVILUPPO DELLE
                        COMUNITÀ DI ENERGIA IN SARDEGNA</h5>
                    <div className={"my-12"}>
                        <Autocomplete options={municipalities}
                                      getOptionLabel={(option) => option.label}
                                      sx={{width: 300}}
                                      noOptionsText={'Nessun risultato'}
                                      value={selectedMunicipality}
                                      onChange={(event, newValue) => handleLoadMunicipalityData(newValue)}
                                      isOptionEqualToValue={(option, value) => option.value === value.value}
                                      renderInput={(params) => {
                                          return <TextField {...params} label="Seleziona il tuo comune"/>
                                      }
                                      }>

                        </Autocomplete>
                    </div>
                    <div className={"relative my-14"} id={"mapContainer"}>
                        <img src={"/assets/Img_LandingPage_2.png"} alt={"Mappa della Sardegna"}
                             className={"w-1/4 relative mx-auto"}/>
                        {/* INIZIO TABELLA */}
                        {
                            !isLoadingData && selectedMunicipality &&
                            <>
                                {/* Mobile */}
                                <table className={"bg-white md:hidden mx-auto mt-3"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={2}
                                            className={"bg-primary text-white"}>{selectedMunicipality.value} (Prov)
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>N° totale aderenti</td>
                                        <td>151</td>
                                    </tr>
                                    <tr>
                                        <td>N° totale Consumatori</td>
                                        <td>82</td>
                                    </tr>
                                    <tr>
                                        <td>N° totale Produttori</td>
                                        <td>58</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th colSpan={2}
                                            className={"bg-secondary text-primary text-sm font-light cursor-pointer"}
                                            onClick={handleClick}>Avvia la simulazione, unisciti alla CER del tuo comune
                                        </th>
                                    </tr>
                                    </tfoot>
                                </table>

                                {/*Desktop*/}
                                <table className={"bg-white hidden md:block mdTable"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={2}
                                            className={"bg-primary text-white"}>{selectedMunicipality.value} (Prov)
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>N° totale aderenti</td>
                                        <td>151</td>
                                    </tr>
                                    <tr>
                                        <td>N° totale Consumatori</td>
                                        <td>82</td>
                                    </tr>
                                    <tr>
                                        <td>N° totale Produttori</td>
                                        <td>58</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th colSpan={2}
                                            className={"bg-secondary text-primary text-sm font-light cursor-pointer"}
                                            onClick={handleClick}>Avvia la simulazione, unisciti alla CER del tuo comune
                                        </th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </>
                        }
                        {/* FINE TABELLA*/}
                    </div>


                </div>
            </main>
        </ThemeProvider>
    );
}
