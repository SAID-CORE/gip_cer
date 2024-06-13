'use client'
import {FormControl, FormHelperText, Grid, InputLabel, Select, Slider, TextField} from "@mui/material";
import LoaderDKW from "@/app/components/LoaderDKW";
import {useState} from "react";
import {number, object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function DataForm({setStep}) {
    const [isLoading, setIsLoading] = useState(false)
    const [secondStepValues, setSecondStepValues] = useState({
        user_type: "",
        community_type: "",
        property_type: "",
        has_pv_type: "",
        avg_monthly_bill: "",
        family_size: "",
        year: ""
        // auth: true
    })

    const formSchema = object({
        user_type: string().required("Scegli una tipologia di utente"),
        property_type: string().required("Scegli una tipologia di immobile"),
        avg_monthly_bill: string().required("Indica il consumo medio mensile in bolletta"),
        community_types: string(),
        // .required("Scegli il ruolo che intendi assumere nella comunità"),
        has_pv_type: string(),
        // .required("Campo obbligatorio"),
        year: number(),
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

    function onSubmitForm(dataFromForm) {
        console.log(dataFromForm)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep((prev) => prev + 1)
        }, 3000)

    }

    function valuetext(value) {
        return `${value} Kw/h`;
    }

    return (
        <>
            {!isLoading ?
                <form className={"flex-grow flex flex-col items-center justify-center"}
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
                                                <MenuItem value={option.value}>{option.label}</MenuItem>)}
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
                                                <MenuItem value={option.value}>{option.label}</MenuItem>) : null}
                                            {control._formValues.user_type === "2" ? companyPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}>{option.label}</MenuItem>) : null}
                                            {control._formValues.user_type === "3" ? othersPropertyTypesOptions.map((option) =>
                                                <MenuItem value={option.value}>{option.label}</MenuItem>) : null}

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
                                        <Typography gutterBottom sx={{mx: "auto", color: "rgb(0 0 0 / 60%)"}}>Consumo
                                            medio
                                            mensile
                                            in
                                            bolletta</Typography>
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
                                        <InputLabel id="community_type">Ruolo comunità</InputLabel>
                                        <Select
                                            labelId={"community_type"}
                                            label={"Ruolo comunità"}
                                            fullWidth={true}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            optio
                                            error={Boolean(formErrors.community_type)}
                                        >
                                            {communityTypeOptions.map((option) =>
                                                <MenuItem value={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
                                            {formErrors.community_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="has_pv_type"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="has_pv_type">Hai già un impianto?</InputLabel>
                                        <Select
                                            labelId={"has_pv_type"}
                                            label={"Hai già un impianto?"}
                                            fullWidth={true}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            optio
                                            error={Boolean(formErrors.has_pv_type)}
                                        >
                                            {pvTypesOptions.map((option) =>
                                                <MenuItem value={option.value}>{option.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DEFINITO IN USERSCHEMA */}
                                            {formErrors.has_pv_type?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="year"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>  <TextField
                                        label={"Anno connessione impianto"}
                                        fullWidth={true}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={Boolean(formErrors.year)}/>
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.year?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        </Grid>
                    </Grid>
                </form> :
                <div className={"flex flex-grow"}>
                    <LoaderDKW/>
                </div>
            }
        </>
    )
}