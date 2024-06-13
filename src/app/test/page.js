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
import LoaderDKW from "@/app/components/LoaderDKW";
import LeadForm from "@/app/components/LeadForm";


export default function Home() {
    const [step, setStep] = useState(0);


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
                {step === 0 && <LeadForm></LeadForm>}

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
