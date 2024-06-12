'use client'
import {theme} from "@/MuiTheme";
import {Autocomplete, Grid, TextField, ThemeProvider, Tooltip} from "@mui/material";
import FirstIcon from "@/app/components/icons/FirstIcon";
import SecondIcon from "@/app/components/icons/SecondIcon";
import ThirdIcon from "@/app/components/icons/ThirdIcon";
import Info from "@/app/components/icons/Info";
import {useState} from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwitchSelector from "react-switch-selector";


export default function Home() {
    const [step, setStep] = useState(0);
    const [firstStepValues, setFirstStepValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phoneNumber: "",
    })

    const options = [
        {
            label: "Rifiuta",
            value: false,
            selectedBackgroundColor: "var(--tertiary)",
        },
        {
            label: "Accetta",
            value: true,
            selectedBackgroundColor: "var(--tertiary)",
        },
    ];

    const onChange = (newValue) => {
        console.log(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <main className="flex min-h-screen flex-col bg-white">
                <div className={"bg-primary flex justify-between  items-center px-28"} id={"breadcrumb"}>

                    <FirstIcon color={"var(--tertiary)"}/>
                    <hr className={"flex-grow"}
                        style={{borderColor: (step === 1 || step === 2) ? "var(--tertiary)" : "white"}}/>
                    <SecondIcon color={(step === 1 || step === 2) ? "var(--tertiary)" : "white"}/>
                    <hr className={"flex-grow"} style={{borderColor: step === 2 ? "var(--tertiary)" : "white"}}/>
                    <ThirdIcon color={step === 2 ? "var(--tertiary)" : "white"}/>
                </div>
                <form className={"flex-grow flex flex-col items-center justify-center"}>
                    <Grid container sx={{width: "70%", mx: "auto"}} spacing={1}>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.firstName}
                                       label={"Nome"}
                                       fullWidth={true}
                                       required={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           firstName: e.target.value
                                       }))}/>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.lastName}
                                       label={"Cognome"}
                                       fullWidth={true}
                                       required={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           lastName: e.target.value
                                       }))}/>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.address}
                                       label={"Indirizzo"}
                                       fullWidth={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           address: e.target.value
                                       }))}/>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.city}
                                       label={"Città"}
                                       fullWidth={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           city: e.target.value
                                       }))}/>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.email}
                                       label={"Email"}
                                       fullWidth={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           email: e.target.value
                                       }))}/>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <TextField value={firstStepValues.phoneNumber}
                                       label={"Telefono"}
                                       fullWidth={true}
                                       required={true}
                                       onChange={(e) => setFirstStepValues((prevState) => ({
                                           ...prevState,
                                           phoneNumber: e.target.value
                                       }))}/>
                        </Grid>
                        <div className={"bg-gray-200 rounded w-full mt-12 mx-auto p-12"}>
                            <h4 className={"w-full text-xl mb-3"}>Autorizzazioni</h4>
                            <div className={"flex justify-between flex-wrap"}>

                                <div>
                                    <div className={"flex items-center"}>
                                        <Tooltip title="Consensi privacy">
                                            <IconButton>
                                                <Info/>
                                            </IconButton>
                                        </Tooltip>
                                        <p>Privacy Policy</p>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <Tooltip title="Condizioni di utilizzo">
                                            <IconButton>
                                                <Info/>
                                            </IconButton>
                                        </Tooltip>
                                        <p>Condizioni d'uso</p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className={"switchWrapper mt-3 md:mt:0"}>
                                    <SwitchSelector
                                        onChange={onChange}
                                        options={options}
                                        initialSelectedIndex={0}
                                        backgroundColor={"var(--primary)"}
                                        fontColor={"#FFFFFF"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={"w-full flex justify-end mt-8"}>
                            <Button variant={"contained"} color={"primary"} type={"submit"}>Successivo</Button>
                        </div>
                    </Grid>
                </form>
                <Button onClick={() => {
                    if (step !== 2) {
                        setStep((prevState) => prevState + 1)
                    } else {
                        setStep(0)
                    }
                }}>NEXT STEP </Button>
            </main>
        </ThemeProvider>
    );
}
