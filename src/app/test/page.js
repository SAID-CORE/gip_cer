'use client'
import {theme} from "@/MuiTheme";
import {ThemeProvider} from "@mui/material";
import FirstIcon from "@/app/components/icons/FirstIcon";
import SecondIcon from "@/app/components/icons/SecondIcon";
import ThirdIcon from "@/app/components/icons/ThirdIcon";
import {useState} from "react";
import Button from "@mui/material/Button";
import LeadForm from "@/app/components/LeadForm";
import DataForm from "@/app/components/icons/DataForm";


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
                {step === 0 && <LeadForm setStep={setStep}></LeadForm>}
                {step === 1 && <DataForm setStep={setStep}></DataForm>}

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
