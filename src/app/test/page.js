'use client'
import {theme} from "@/MuiTheme";
import {ThemeProvider} from "@mui/material";
import FirstIcon from "@/app/components/icons/FirstIcon";
import SecondIcon from "@/app/components/icons/SecondIcon";
import ThirdIcon from "@/app/components/icons/ThirdIcon";
import {useState} from "react";
import Button from "@mui/material/Button";
import LeadForm from "@/app/components/LeadForm";
import DataForm from "@/app/components/DataForm";


export default function Home() {
    const [step, setStep] = useState(0);
    const [leadId, setLeadId] = useState("");


    return (
        <ThemeProvider theme={theme}>
            <main className="flex min-h-screen flex-col bg-white">
                <div className={"bg-primary flex justify-between  items-center md:px-14 lg:px-28"} id={"breadcrumb"}>

                    <span className={"scale-50 md:scale-5 lg:scale-100"}><FirstIcon color={"var(--tertiary)"}/></span>
                    <hr className={"flex-grow"}
                        style={{borderColor: (step === 1 || step === 2) ? "var(--tertiary)" : "white"}}/>
                    <span className={"scale-50 md:scale-75 lg:scale-100"}><SecondIcon
                        color={(step === 1 || step === 2) ? "var(--tertiary)" : "white"}/></span>
                    <hr className={"flex-grow"} style={{borderColor: step === 2 ? "var(--tertiary)" : "white"}}/>
                    <span className={"scale-50 md:scale-75 lg:scale-100"}> <ThirdIcon
                        color={step === 2 ? "var(--tertiary)" : "white"}/></span>
                </div>
                {step === 0 && <LeadForm setStep={setStep} setLeadId={setLeadId}></LeadForm>}
                {step > 0 && <DataForm setStep={setStep} leadId={leadId}></DataForm>}

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
