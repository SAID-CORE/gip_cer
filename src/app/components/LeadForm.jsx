'use client'
import React, {useState, useEffect, useRef} from 'react';
import {Autocomplete, FormHelperText, Grid, Modal, TextField, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Info from "@/app/components/icons/Info";
import SwitchSelector from "react-switch-selector";
import Button from "@mui/material/Button";
import LoaderDKW from "@/app/components/LoaderDKW";
import {boolean, object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useJsApiLoader, Autocomplete as GoogleAutocomplete} from '@react-google-maps/api';
import MenuItem from "@mui/material/MenuItem";

const libs = ["places"];
export default function LeadForm({setStep, setLeadId}) {
    const [geoData, setGeoData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const autocompleteRef = useRef(null);
    const {isLoaded} = useJsApiLoader({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, libraries: libs});
    useEffect(() => {
        if (isLoaded) {
            const gAutocomplete = new google.maps.places.Autocomplete(autocompleteRef.current, {
                types: ['address'],
                componentRestrictions: {country: 'IT'}
            });
            setAutocomplete(gAutocomplete);
            gAutocomplete.addListener('place_changed', () => {
                const place = gAutocomplete.getPlace();
                // console.log("PLACE FROM GOOGLE PLACES", place)
                setGeoData(place)
                const address = place.formatted_address;
                let city = '';
                for (const component of place.address_components) {
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                        break;
                    }
                }
                setValue("address", address);
                setValue("city", city);
            });
            autocompleteRef.current.setAttribute("placeholder", "Inserisci il tuo indirizzo");
        }
    }, [isLoaded]);

    const [firstStepValues, setFirstStepValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phoneNumber: "",
        auth: false
    });

    const [open, setOpen] = useState(false);

    const formSchema = object({
        firstName: string().required("Inserisci il tuo nome"),
        lastName: string().required("Inserisci il tuo cognome"),
        address: string(),
        city: string(),
        email: string().matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            {
                message: "Inserisci un'email valida",
                excludeEmptyString: true // permette stringhe vuote
            }),
        phoneNumber: string().required("Inserisci il tuo numero di telefono").matches(
            /^(?:(?:\+|00)39)?\s*(?:0\d{2,4}\s*\d{6,8}|3\d{2}\s*\d{7})$/,
            "Inserisci un numero di telefono valido"
        ),
        auth: boolean().oneOf([true], "Per andare avanti è necessario accettare i termini di utilizzo")
    });

    const {
        reset: formReset,
        control: control,
        handleSubmit: handleFormSubmit,
        formState: {errors: formErrors},
        setValue,
    } = useForm({
        defaultValues: firstStepValues,
        resolver: yupResolver(formSchema),
    });

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

    const onChangeSwitch = (newValue) => {
        setValue("auth", newValue)
        formErrors.auth = null
    };

    const handleClose = () => {
        setOpen(false)
    };

    const onSubmitForm = async (dataFromForm) => {
        const body = {
            "num_tel": dataFromForm.phoneNumber,
            "name": dataFromForm.firstName,
            "surname": dataFromForm.lastName,
            "email": dataFromForm.email,
            "address": dataFromForm.address,
            "city": dataFromForm.city,
            "terms": dataFromForm.auth,
            "geo_data": geoData,
        }
        console.log("REQUEST BODY", body)
        try {
            setIsLoading(true);
            const response = await fetch("/api/firstPage", {method: "POST", body: JSON.stringify(body)});
            if (response.ok) {
                const result = await response.json();
                setLeadId(result.id);
                setStep(prev => prev + 1);
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (err) {
            setIsError(true);
            setOpen(true);
        }
        setIsLoading(false);
    };


    return (
        <>
            {!isLoading ?
                <form className={"flex-grow flex flex-col items-center justify-center my-8"}
                      onSubmit={handleFormSubmit(onSubmitForm)}>
                    <Grid container sx={{width: "70%", mx: "auto"}} spacing={1}>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>
                                        <TextField
                                            label={"Nome"}
                                            fullWidth={true}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(formErrors.firstName)}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.firstName?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="lastName"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>
                                        <TextField
                                            label={"Cognome"}
                                            fullWidth={true}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(formErrors.lastName)}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.lastName?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="address"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>
                                        <TextField
                                            inputRef={autocompleteRef}
                                            label={"Indirizzo"}
                                            fullWidth={true}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(formErrors.address)}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.address?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="city"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <TextField
                                        label={"Città"}
                                        fullWidth={true}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={Boolean(formErrors.city)}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="email"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <TextField
                                        label={"Email"}
                                        fullWidth={true}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        helperText={formErrors.email?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <>
                                        <TextField
                                            label={"Telefono"}
                                            fullWidth
                                            type={"number"}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={Boolean(formErrors.phoneNumber)}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {formErrors.phoneNumber?.message}
                                        </FormHelperText>
                                    </>
                                )}
                            />
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
                                    <Controller
                                        control={control}
                                        name="auth"
                                        render={({field: {onChange, onBlur, value, ref}}) =>
                                            <>
                                                <SwitchSelector
                                                    onChange={onChangeSwitch}
                                                    options={options}
                                                    initialSelectedIndex={control._formValues.auth ? 1 : 0}
                                                    backgroundColor={"var(--primary)"}
                                                    fontColor={"#FFFFFF"}
                                                    error={Boolean(formErrors.auth)}
                                                />
                                                <FormHelperText sx={{color: 'error.main'}}>
                                                    {formErrors.auth?.message}
                                                </FormHelperText>
                                            </>}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={"w-full flex justify-end mt-8"}>
                            <Button variant={"contained"} color={"primary"} type={"submit"}>Successivo</Button>
                        </div>
                        {isError && <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                backgroundColor: "#FFFFFF",
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Errore durante l'invio dei dati
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    Ti invitiamo a riprovare più tardi...
                                </Typography>
                            </Box>
                        </Modal>}
                    </Grid>
                </form> :
                <div className={"flex flex-grow"}>
                    <LoaderDKW/>
                </div>
            }
        </>
    )
}
