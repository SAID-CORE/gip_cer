'use client'
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    LinearProgress,
    Select,
    Slider,
    TextField, Tooltip,
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {number, object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudUpload from "@/app/components/icons/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Info from "@/app/components/icons/Info";
import uploadS3 from "@/app/utils/uploadS3.js";
import {useRouter} from 'next/navigation';
import generateGaussianArray from "@/app/utils/randomGenerator.js";
import GearSmall from "@/app/components/icons/GearSmall.jsx";


export default function DataForm({setStep, leadId}) {
    const loaderArray = generateGaussianArray()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [fakeProgress, setFakeProgress] = useState(0)
    const [secondStepValues, setSecondStepValues] = useState({
        user_type: "",
        community_type: "",
        property_type: "",
        has_pv_type: "",
        avg_monthly_bill: "",
        family_size: "",
        year: null
        // auth: true
    })

    const formSchema = object({
        user_type: string().required("Scegli una tipologia di utente"),
        property_type: string().required("Scegli una tipologia di immobile"),
        avg_monthly_bill: string().required("Indica il consumo medio mensile in bolletta"),
        community_type: string().required("Scegli il ruolo che intendi assumere nella comunità"),
        has_pv_type: string(),
        // .required("Campo obbligatorio"),
        year: number().nullable(),
        // auth: boolean().oneOf([true], "Per andare avanti è necessario accettare i termini di utilizzo")
    });

    const {
        reset: formReset,
        control: control,
        handleSubmit: handleFormSubmit,
        formState: {errors: formErrors},
        setValue,
        watch
    } = useForm({
        defaultValues: secondStepValues,
        resolver: yupResolver(formSchema),
    });

    // SELECT OPTIONS
    const userTypeOptions = [
        {
            label: "Cittadino",
            value: "1",
        },
        {
            label: "Impresa",
            value: "2",
        },
        {
            label: "Onlus o ente religioso",
            value: "3",
        }
    ];
    const communityTypeOptions = [
        {
            label: "Consumatore",
            value: "1",
        },
        {
            label: "Produttore",
            value: "2",
        },
        // {
        //     label: "Prosumer",
        //     value: "3",
        // }
    ];
    const privatePropertyTypesOptions = [
        {
            label: "Condominio",
            value: "1",
        },
        {
            label: "Casa singola",
            value: "2",
        },
        {
            label: "Casa plurifamiliare",
            value: "3",
        },
        {
            label: "Residence",
            value: "4",
        }
    ];
    const companyPropertyTypesOptions = [
        {
            label: "Capannone",
            value: "5",
        },
        {
            label: "Edificio singolo",
            value: "6",
        },
        {
            label: "Edificio pubblico",
            value: "7",
        }
    ];
    const othersPropertyTypesOptions = [...privatePropertyTypesOptions, ...companyPropertyTypesOptions]
    const pvTypesOptions = [
        {
            label: "Si",
            value: "1",
        },
        {
            label: "No",
            value: "2",
        },
        {
            label: "In fase di installazione",
            value: "3",
        },
        {
            label: "In fase di progettazione",
            value: "4",
        },
    ]
    const marks = [
        {
            value: 0,
            label: '0 kw',
        },
        {
            value: 30,
            label: '30 kw',
        },
        {
            value: 100,
            label: '100 kw',
        },
    ];

    useEffect(() => {
        setValue("has_pv_type", "");
        setValue("year", null);
    }, [watch("community_type"), setValue]);

    async function onSubmitForm(dataFromForm) {
        setIsLoading(true);
        setProgress(0)
        const body = {
            id: leadId || "a8cd4fe8-01b1-5c7a-a0a4-07657922da16",
            ...dataFromForm,
            has_pv_type: dataFromForm.community_type === "1" ? null : dataFromForm.has_pv_type,
            metadata: {has_bills: files.length > 0, bills_number: files.length}
        };
        console.log("REQUEST BODY", body)
        setStep((prev) => prev + 1);

        try {
            const response = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.open('POST', "/api/secondPage", true);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        setProgress(percentComplete); // Call the onProgress callback with the progress value
                    }
                };

                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Request failed with status: ${xhr.status} - ${xhr.statusText}`));
                    }
                };

                xhr.onerror = function () {
                    reject(new Error(`Network error occurred: ${xhr.statusText}`));
                };

                xhr.send(JSON.stringify(body));
            });

            const {urls} = response;
            console.log("PRESIGNED URLS", urls);
            for (let i = 0; i < urls.length; i++) {
                try {
                    await uploadS3(urls[i], files[i], p => setProgress(p));
                } catch (e) {
                    console.log(e);
                    alert('si è verificato un errore, riprova più tardi');
                    setProgress(100);
                    return;
                }
            }

            // router.push("/result")
        } catch (err) {
            alert(err);
        } finally {
            // setIsLoading(false);
        }
    }


    function valuetext(value) {
        return `${value} Kw/h`;
    }

    const handleFileUpload = (e) => {
        if (!e.target.files.length > 0) {
            return;
        }
        const files = Array.from(e.target.files)
        setFiles(files)
    }

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const loaderTexts = ["verifica consumi annui in bolletta", "verifica immobile ed esposizione", "verifica impianto di produzione", "valutazione produzione annua", "valutazione autoconsumo", "valutazione energia condivisa", "valutazione incentivo Rid", "valutazione altri incentivi CER", "verifica ammortamento", "esito valutazione"]
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            let currentStep = 0;

            const interval = setInterval(() => {
                setFakeProgress((prevProgress) => {
                    if (prevProgress === 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + (100 / loaderArray.length);
                });
                if (fakeProgress === 100) {
                    router.push("/result");
                }
                currentStep += 1;
                if (currentStep === loaderArray.length - 2) {
                    if (progress === 100) {
                        clearInterval(interval);
                    }

                }
            }, loaderArray[currentStep] * 1000);

            return () => clearInterval(interval);
        }
    }, [isLoading, loaderArray, router]);

    return (
        <>
            {!isLoading ?
                <form className={"flex-grow flex flex-col items-center justify-center my-8"}
                      onSubmit={handleFormSubmit(onSubmitForm)}>
                    <Grid container sx={{width: "70%", mx: "auto"}} spacing={1}>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="user_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="user_type">Tipologia Utente</InputLabel>
                                        <Select
                                            labelId={"user_type"}
                                            label={"Tipologia utente"}
                                            fullWidth={true}
                                            onChange={(e) => {
                                                setValue("property_type", "")
                                                onChange(e)
                                            }}// send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.user_type)}
                                        >
                                            {userTypeOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.user_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="property_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="property_type">Tipologia di immobile</InputLabel>
                                        <Select
                                            labelId={"property_type"}
                                            label={"Tipologia di immobile"}
                                            fullWidth={true}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.property_type)}
                                        >
                                            {watch("user_type") === "1" ? privatePropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}
                                            {watch("user_type") === "2" ? companyPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}
                                            {watch("user_type") === "3" ? othersPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}

                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.property_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="avg_monthly_bill"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography gutterBottom sx={{
                                            mx: "auto",
                                            color: "rgb(0 0 0 / 60%)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>Consumo
                                            medio
                                            mensile
                                            in
                                            bolletta
                                            <Tooltip sx={{display: watch("user_type") !== "1" && "none"}}
                                                     title={<h4 className={"text-lg"}>Una famiglia di x persone consuma
                                                         in
                                                         media y kw/mese</h4>}>
                                                <IconButton>
                                                    <Info/>
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                        <Slider
                                            sx={{width: "90%", mx: "auto"}}
                                            name={"avg_monthly_bill"}
                                            aria-label="Always visible"
                                            valueLabelDisplay="auto"
                                            defaultValue={80}
                                            step={10}
                                            getAriaValueText={valuetext}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.avg_monthly_bill).toString()}
                                            shiftStep={30}
                                            marks={marks}
                                            min={10}
                                            max={150}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.avg_monthly_bill?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}/>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="community_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="community_type" sx={{display: "flex", alignItems: "center"}}>Ruolo
                                            comunità <Tooltip
                                                title={<>
                                                    <h4 className={"text-lg"}>Consumatore:preleva l’energia elettrica
                                                        dalla rete per la quota di proprio uso finale</h4>
                                                    <h4 className={"text-lg"}>Produttore: produce energia elettrica
                                                        rinnovabile e la immette in rete per condividerla
                                                    </h4></>}>
                                                <IconButton>
                                                    <Info/>
                                                </IconButton>
                                            </Tooltip></InputLabel>
                                        <Select
                                            label={`Ruolo comunità ${
                                                <Info/>
                                            }`}
                                            fullWidth={true}
                                            onChange={(e) => {
                                                onChange(e);
                                                setValue("has_pv_type", "");
                                                setValue("year", null);
                                            }} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.community_type)}
                                        >
                                            {communityTypeOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.community_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}
                              sx={{py: 2, display: watch("community_type") !== "2" && "none"}}>
                            <Controller
                                control={control}
                                name="has_pv_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="has_pv_type">Hai già un impianto?</InputLabel>
                                        <Select
                                            label={"Hai già un impianto?"}
                                            fullWidth={true}
                                            onChange={(e) => {
                                                setValue("year", null)
                                                onChange(e)
                                            }}// send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.has_pv_type)}
                                        >
                                            {pvTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.has_pv_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}
                              sx={{py: 2, display: watch("community_type") !== "2" && "none"}}>
                            <Controller
                                control={control}
                                name="year"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>  <TextField
                                        type={"number"}
                                        InputProps={{inputProps: {max: new Date().getFullYear()}}}
                                        label={"Anno connessione impianto"}
                                        disabled={watch("has_pv_type") !== "1"}
                                        fullWidth={true}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value || ""}
                                        error={Boolean(formErrors.year)}/>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.year?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        </Grid>
                        <div
                            className={"bg-tertiary rounded w-full mt-12 mx-auto p-4 text-white flex justify-between items-center flex-wrap md:flex-nowrap"}>
                            <div className={""}>
                                <h4 className={"w-full text-xl mb-3"}>Carica la tua bolletta per avviare una simulazione
                                    più
                                    accurata</h4>
                                <small>I file accettati sono in formato: pdf, jpeg, png e non possono superare i
                                    5mb</small>
                            </div>
                            <div>
                                <Button variant={"contained"}
                                        color={"secondary"}
                                        onClick={handleButtonClick}
                                        sx={{
                                            backgroundColor: "white",
                                            color: "var(--primary)",
                                            fontWeight: "bold"
                                        }}>
                                    <input type={"file"} accept={"application/pdf, image/*"} ref={fileInputRef} hidden
                                           multiple
                                           onChange={handleFileUpload}/>Carica
                                    <span className={"ms-2"}><CloudUpload/></span>

                                </Button>
                            </div>
                        </div>
                        <div className={"w-full flex justify-end mt-8"}>
                            <Button id={"submitDataButton"} variant={"contained"} color={"secondary"} type={"submit"}
                                    sx={{
                                        fontSize: "1.2em",
                                        fontWeight: "bold"
                                    }}>Avvia
                                Simulazione <GearSmall color={"#406441"}/>
                            </Button>
                        </div>
                    </Grid>
                </form> :
                <div className={"flex flex-col flex-grow justify-center items-center"}>
                    <Typography variant="h4" color={"primary"}
                                sx={{fontSize: {xs: "0.8em", md: "1.2em", lg: "1.6em"}, fontWeight: "bold"}}>ELABORAZIONE
                        RISULTATO SIMULAZIONE</Typography>
                    <LinearProgress variant="determinate" color={"tertiary"} value={fakeProgress}
                                    sx={{
                                        height: "30px",
                                        width: "70%",
                                        borderRadius: "50px",
                                        backgroundColor: "#D9D9D9 !important",
                                        mt: 3
                                    }}/>
                    <small
                        className={"text-tertiary my-3 text-lg"}>{loaderTexts[Math.ceil(fakeProgress / 10) - 1]}</small>
                </div>
            }
        </>
    )
}
