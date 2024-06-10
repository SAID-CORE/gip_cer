'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaSearch, FaWhatsapp} from "react-icons/fa";
import {useState} from "react";
import {MdEmail} from "react-icons/md";
import {TextField, Tooltip} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {theme} from "@/MuiTheme";
import {redirect} from "next/navigation";


export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElSearch, setAnchorElSearch] = useState(null);
    const [anchorElServices, setAnchorElServices] = useState(null);
    const [search, setSearch] = useState("");

    const pages = [{
        title: 'Home',
        href: "https://deltakilowatt.it/"
    },
        {
            title: 'I nostri servizi',
            href: "https://deltakilowatt.it/superbonus/"
        },
        {
            title: 'CER',
            href: "https://cer.deltakilowatt.it/"
        },
        {
            title: 'Superbonus',
            href: "https://deltakilowatt.it/superbonus/"
        },
        {
            title: 'Studio di fattibilità',
            href: "https://deltakilowatt.it/studio-di-fattibilita/"
        },
        {
            title: 'Blog',
            href: "https://deltakilowatt.it/blog/"
        },];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenSearchMenu = (event) => {
        setAnchorElSearch(event.currentTarget);
    };
    const handleCloseSearchMenu = () => {
        setAnchorElSearch(null);
    };
    const handleOpenServicesMenu = (event) => {
        setAnchorElServices(event.currentTarget);
    };
    const handleCloseServicesMenu = () => {
        setAnchorElServices(null);
    };
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        handleCloseSearchMenu()
        window.open(`https://deltakilowatt.it/?s=${search}`, '_blank')
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{backgroundColor: "white"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{dispay: "flex", justifyContent: "space-between"}}>
                        <img id={"navLogo"} alt={"Delta Kilowatt"} src={"/assets/Delta_KiloWatt_logoSmall.webp"}
                             className={""}/>
                        <div>
                            {/* MOBILE NAVBAR */}
                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, color: "#808080"}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page, index) => (
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <a href={page.href} target={"_blank"}>
                                                <Typography textAlign="center"
                                                            sx={{color: "black"}}>{page.title}</Typography>
                                            </a>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            {/* LARGER NAVBAR */}
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', color: "#808080"}}}>
                                <a href={pages[0].href} target={"_blank"}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {pages[0].title}
                                    </Button>
                                </a>
                                <Box sx={{flexGrow: 0}} id={"navbarDropdown"}>
                                    <Button
                                        onClick={handleOpenServicesMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        I nostri servizi
                                    </Button>
                                    <Menu
                                        sx={{mt: '30px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElServices}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElServices)}
                                        onClose={handleCloseServicesMenu}
                                    >
                                        <MenuItem onClick={handleCloseServicesMenu}>
                                            <a href={"https://deltakilowatt.it/impianti-fotovoltaici/"}
                                               target={"_blank"}>
                                                <Button
                                                    onClick={handleCloseNavMenu}
                                                    sx={{color: 'gray', display: 'block'}}
                                                >
                                                    Fotovoltaico
                                                </Button>
                                            </a>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseServicesMenu}>
                                            <a href={"https://deltakilowatt.it/clima/"} target={"_blank"}>
                                                <Button
                                                    onClick={handleCloseNavMenu}
                                                    sx={{color: 'gray', display: 'block'}}
                                                >
                                                    Clima
                                                </Button>
                                            </a>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseServicesMenu}>
                                            <a href={"https://deltakilowatt.it/efficienza-energetica/"}
                                               target={"_blank"}>
                                                <Button
                                                    onClick={handleCloseNavMenu}
                                                    sx={{color: 'gray', display: 'block'}}
                                                >
                                                    Efficienza energetica
                                                </Button>
                                            </a>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseServicesMenu}>
                                            <a href={"https://deltakilowatt.it/amianto/"} target={"_blank"}>
                                                <Button
                                                    onClick={handleCloseNavMenu}
                                                    sx={{color: 'gray', display: 'block'}}
                                                >
                                                    Bonifica amianto
                                                </Button>
                                            </a>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <a href={pages[2].href} target={"_blank"}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {pages[2].title}
                                    </Button>
                                </a>
                                <a href={pages[3].href} target={"_blank"}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {pages[3].title}
                                    </Button>
                                </a>
                                <a href={pages[4].href} target={"_blank"}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {pages[4].title}
                                    </Button>
                                </a> <a href={pages[5].href} target={"_blank"}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {pages[5].title}
                                </Button>
                            </a>
                                <a href={"https://deltakilowatt.it/contattaci/"} target={"_blank"}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                            border: "1px solid",
                                            borderRadius: "0px"
                                        }}
                                    >
                                        Contattaci
                                    </Button>
                                </a>
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Cerca nel sito">
                                        <IconButton onClick={handleOpenSearchMenu}
                                                    className={"h-full text-xl searchBtn"}>
                                            <FaSearch/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '30px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElSearch}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElSearch)}
                                        onClose={handleCloseSearchMenu}
                                    >
                                        <MenuItem
                                            // onClick={handleCloseUserMenu}
                                        >
                                            <form className={"flex"} onSubmit={handleSubmitSearch}>
                                                <TextField
                                                    label="Cerca"
                                                    size="small"
                                                    color={"tertiary"}
                                                    sx={{borderRadius: "0px !importants"}}
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                <Button variant={"contained"} color={"tertiary"}
                                                        sx={{borderRadius: "0px"}} type={"submit"}> <FaSearch
                                                    className={"text-white aspect-square"}/></Button>
                                            </form>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <div className={"socialIcons flex items-center ps-2 ms-2"}>
                                    <a className={"facebookIcon"} href={"https://www.facebook.com/deltakilowatt.it"}
                                       target={"_blank"}>
                                        <FaFacebookF/>
                                    </a>
                                    <a className={"whatsappIcon"}
                                       href={"https://api.whatsapp.com/send/?phone=393515708566&text&type=phone_number&app_absent=0"}
                                       target={"_blank"}>
                                        <FaWhatsapp/>
                                    </a>
                                    <a className={"mailIcon"} href={"mailto:info@deltakilowatt.it"}
                                        // target={"_blank"}
                                    >
                                        <MdEmail/>
                                    </a>
                                    <a className={"linkedinIcon"}
                                       href={"https://www.linkedin.com/company/deltakilowatt/?originalSubdomain=it"}
                                       target={"_blank"}>
                                        <FaLinkedinIn/>
                                    </a>
                                    <a className={"instagramIcon"} href={"https://www.instagram.com/deltakilowatt_/"}
                                       target={"_blank"}>
                                        <FaInstagram/>
                                    </a>
                                </div>
                            </Box>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}