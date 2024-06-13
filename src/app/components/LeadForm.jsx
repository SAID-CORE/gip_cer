'use client'
import {FormHelperText, Grid, TextField, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Info from "@/app/components/icons/Info";
import SwitchSelector from "react-switch-selector";
import Button from "@mui/material/Button";
import LoaderDKW from "@/app/components/LoaderDKW";
import {useState} from "react";

import {email, object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export default function LeadForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [firstStepValues, setFirstStepValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phoneNumber: "",
    })

    const formSchema = object({
        firstName: string().required("Insersci il tuo nome"),
        lastName: string().required("Insersci il tuo cognome"),
        address: string(),
        city: string(),
        email: string(),
        phoneNumber: string().required("Insersci il tuo numero di telefono"),
    });

    const {
        reset: formReset,
        control: control,
        handleSubmit: handleFormSubmit,
        formState: {errors: formErrors},
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
        console.log(newValue);
    };

    function onSubmitForm(dataFromForm) {
        console.log(dataFromForm)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)

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
                                name="firstName"
                                render={({field: {onChange, onBlur, value, ref}}) => (<>
                                        <TextField
                                            label={"Nome"}
                                            fullWidth={true}
                                            onChange={onChange} // send value to hook form
                                            onBlur={onBlur} // notify when input is touched/blur
                                            value={value}
                                            error={Boolean(formErrors.firstName)}
                                        />
                                        <FormHelperText sx={{color: 'error.main'}}>
                                            {/* MESSAGGIO DA PROPS || MESSAGGIO DEFINITO IN USERSCHEMA || FALLBACK */}
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
                                    <TextField
                                        label={"Cognome"}
                                        fullWidth={true}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={formErrors.lastName}/>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="address"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <TextField
                                        label={"Indirizzo"}
                                        fullWidth={true}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={formErrors.address}/>
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
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={formErrors.city}/>
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
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={formErrors.email}/>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{py: 2}}>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <TextField
                                        label={"Telefono"}
                                        fullWidth={true}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched/blur
                                        value={value}
                                        error={formErrors.phoneNumber}/>
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
                                    <SwitchSelector
                                        onChange={onChangeSwitch}
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
                </form> :
                <div className={"flex flex-grow"}>
                    <LoaderDKW/>
                </div>
            }
        </>
    )
}