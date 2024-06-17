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


export default function DataForm({setStep}) {
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
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

    async function onSubmitForm(dataFromForm) {
        const body = {
            "id": "a8cd4fe8-01b1-5c7a-a0a4-07657922da16",
            ...dataFromForm,
            "metadata": {"has_bills": files.length > 0, "bills_number": files.length}
        }
        console.log("DATA SUBMIT:", body)

        const response = await fetch("/api/secondPage", {method: "POST", body: JSON.stringify(body)})
        if (response.ok) {
            const result = await response.json()
            console.log(result)
        } else {
            console.log(response.text())
        }
        setStep((prev) => prev + 1)
        setIsLoading(true)
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 3000)

    }

    function valuetext(value) {
        return `${value} Kw/h`;
    }

    const handleFileUpload = (e) => {
        if (!e.target.files.length > 0) {
            return;
        }
        const files = Array.from(e.target.files)
        setFiles(files.map((file) => URL.createObjectURL(file)))
    }

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const loaderTexts = ["verifica consumi annui in bolletta", "verifica immobile ed esposizione", "verifica impianto di produzione", "valutazione produzione annua", "valutazione autoconsumo", "valutazione energia condivisa", "valutazione incentivo Rid", "valutazione altri incentivi CER", "verifica ammortamento", "esito valutazione"]
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

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
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.user_type)}
                                        >
                                            {userTypeOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
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
                                            {control._formValues.user_type === "1" ? privatePropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}
                                            {control._formValues.user_type === "2" ? companyPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}
                                            {control._formValues.user_type === "3" ? othersPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>) : null}

                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
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
                                            <Tooltip sx={{display: control._formValues.user_type !== "1" && "none"}}
                                                     title={<h4 className={"text-lg"}>Una famiglia di x persone consuma
                                                         in
                                                         media y kw/mese</h4>}>
                                                <IconButton>
                                                    <Info/>
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                        {/*<InputLabel id="avg_monthly_bill">Consumo medio mensile in bolletta</InputLabel>*/}
                                        <Slider
                                            sx={{width: "90%", mx: "auto"}}
                                            labelId={"avg_monthly_bill"}
                                            aria-label="Always visible"
                                            valueLabelDisplay="auto"
                                            defaultValue={80}
                                            step={10}
                                            getAriaValueText={valuetext}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.avg_monthly_bill)}
                                            shiftStep={30}
                                            marks={marks}
                                            min={10}
                                            max={150}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
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
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.community_type)}
                                        >
                                            {communityTypeOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
                                            {formErrors.community_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}
                              sx={{py: 2, display: control._formValues.community_type !== "2" && "none"}}>
                            <Controller
                                control={control}
                                name="has_pv_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="has_pv_type">Hai già un impianto?</InputLabel>
                                        <Select
                                            label={"Hai già un impianto?"}
                                            fullWidth={true}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.has_pv_type)}
                                        >
                                            {pvTypesOptions.map((option) =>
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
                                            {formErrors.has_pv_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}
                              sx={{py: 2, display: control._formValues.community_type !== "2" && "none"}}>
                            <Controller
                                control={control}
                                name="year"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>  <TextField
                                        type={"number"}
                                        InputProps={{inputProps: {max: new Date().getFullYear()}}}
                                        label={"Anno connessione impianto"}
                                        disabled={control._formValues.has_pv_type !== "1"}
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
                                Simulazione <svg width="30" height="30" viewBox="0 0 32 32" fill="none"
                                                 className={"mx-2"}
                                                 xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M31.0314 10.5124C31.6631 12.222 32 14.0755 32 16.0042C32 24.8403 24.8403 32 16.0042 32C12.2895 32 8.86964 30.7365 6.1575 28.6141L4.5147 30.0373C4.37153 30.1639 4.1863 30.1974 4.00955 30.1299C3.82432 30.0628 3.71472 29.9111 3.68925 29.7174L3.04093 23.8802C3.01546 23.7115 3.08299 23.5514 3.21767 23.4422C3.35236 23.3326 3.521 23.2986 3.68115 23.3492L9.08883 25.051C9.26557 25.1097 9.38366 25.2447 9.42573 25.43C9.4593 25.6067 9.40026 25.7838 9.26558 25.91L7.83348 27.1565C10.1165 28.8329 12.9467 29.827 16.0042 29.827C23.6359 29.827 29.827 23.6359 29.827 16.0042C29.827 14.4545 29.5742 12.9633 29.1026 11.5737C29.0351 11.363 29.1026 11.1442 29.2794 11.0091L30.265 10.2847C30.3997 10.1836 30.5513 10.1586 30.7115 10.2091C30.8627 10.2512 30.9808 10.3608 31.0314 10.5124ZM16.0042 11.3545C18.5651 11.3545 20.6455 13.4353 20.6455 16.0042C20.6455 18.5647 18.5651 20.6455 16.0042 20.6455C13.4353 20.6455 11.3545 18.5651 11.3545 16.0042C11.3545 13.4353 13.4353 11.3545 16.0042 11.3545ZM18.6658 7.52206C19.1629 7.68221 19.6514 7.88404 20.1149 8.12021C20.2581 8.19585 20.3337 8.356 20.3001 8.51576C20.1064 9.37517 20.3507 10.3102 21.016 10.984C21.6898 11.6578 22.6248 11.8936 23.4842 11.7084C23.644 11.6663 23.8042 11.7419 23.8802 11.8851C24.116 12.3486 24.3182 12.8371 24.4779 13.3427C24.5285 13.4939 24.4698 13.6541 24.3348 13.7467C23.5853 14.2187 23.0968 15.0522 23.0968 16.0042C23.0968 16.9478 23.5853 17.7817 24.3348 18.2533C24.4698 18.3459 24.5285 18.5061 24.4779 18.6658C24.3182 19.1629 24.116 19.6514 23.8802 20.1149C23.8042 20.2581 23.644 20.3337 23.4842 20.3001C22.6248 20.1064 21.6898 20.3507 21.016 21.016C20.3507 21.6898 20.1064 22.6248 20.3001 23.4842C20.3337 23.644 20.2581 23.8042 20.1149 23.8802C19.6514 24.116 19.1629 24.3182 18.6658 24.4779C18.5061 24.5285 18.3459 24.4695 18.2533 24.3348C17.7817 23.5853 16.9478 23.0968 16.0042 23.0968C15.0526 23.0968 14.2187 23.5853 13.7467 24.3348C13.6541 24.4695 13.4939 24.5285 13.3427 24.4779C12.8371 24.3182 12.3486 24.116 11.8851 23.8802C11.7419 23.8042 11.6663 23.644 11.7084 23.4842C11.8936 22.6248 11.6578 21.6898 10.984 21.016C10.3102 20.3507 9.37517 20.1064 8.51576 20.3001C8.356 20.3337 8.19585 20.2581 8.12021 20.1149C7.88404 19.6514 7.68221 19.1629 7.52206 18.6658C7.4715 18.5061 7.53055 18.3459 7.67372 18.2533C8.41504 17.7817 8.9036 16.9478 8.9036 16.0042C8.9036 15.0522 8.41504 14.2187 7.67372 13.7467C7.53055 13.6541 7.4715 13.4939 7.52206 13.3427C7.68221 12.8371 7.88404 12.3486 8.12021 11.8851C8.19585 11.7419 8.356 11.6663 8.51576 11.7084C9.37517 11.8936 10.3102 11.6578 10.984 10.984C11.6578 10.3102 11.8936 9.37517 11.7084 8.51576C11.6663 8.356 11.7419 8.19585 11.8851 8.12021C12.3486 7.88404 12.8371 7.68221 13.3427 7.52206C13.4939 7.4715 13.6541 7.53055 13.7467 7.67372C14.2187 8.41504 15.0526 8.9036 16.0042 8.9036C16.9478 8.9036 17.7817 8.41504 18.2533 7.67372C18.3459 7.53055 18.5061 7.4715 18.6658 7.52206ZM16.0042 0C19.7105 0 23.1304 1.26345 25.8425 3.38631L27.4853 1.96271C27.6285 1.83614 27.8137 1.80256 27.9989 1.87009C28.1761 1.93724 28.2853 2.0889 28.3108 2.28263L28.9591 8.12021C28.9845 8.28846 28.917 8.44861 28.7823 8.55821C28.6476 8.66742 28.479 8.70138 28.3192 8.65083L22.9112 6.94937C22.7344 6.89033 22.6163 6.75565 22.5743 6.57003C22.5407 6.39329 22.5997 6.21654 22.7344 6.08996L24.1665 4.84349C21.8839 3.16712 19.0537 2.17303 16.0042 2.17303C8.36449 2.17303 2.17303 8.36449 2.17303 16.0042C2.17303 17.5455 2.4258 19.0367 2.89776 20.4263C2.9734 20.637 2.89776 20.8562 2.72063 20.9909L1.73503 21.7153C1.60035 21.8164 1.44869 21.8414 1.28892 21.7909C1.13726 21.7488 1.01917 21.6392 0.968621 21.488C0.345385 19.778 0 17.9249 0 16.0042C0 7.15969 7.15969 0 16.0042 0Z"
                                          fill="#406441"/>
                                </svg>
                            </Button>
                        </div>
                    </Grid>
                </form> :
                <div className={"flex flex-col flex-grow justify-center items-center"}>
                    <Typography variant="h4" color={"primary"}
                                sx={{fontSize: {xs: "0.8em", md: "1.2em", lg: "1.6em"}, fontWeight: "bold"}}>ELABORAZIONE
                        RISULTATO SIMULAZIONE</Typography>
                    <LinearProgress variant="determinate" color={"tertiary"} value={progress}
                                    sx={{
                                        height: "30px",
                                        width: "70%",
                                        borderRadius: "50px",
                                        backgroundColor: "#D9D9D9 !important",
                                        mt: 3
                                    }}/>
                    <small className={"text-tertiary my-3 text-lg"}>{loaderTexts[progress.toString().charAt(0)]}</small>

                </div>
            }
        </>
    )
}