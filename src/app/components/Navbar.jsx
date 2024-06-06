'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useState} from "react";


export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const pages = [{
        title: 'Home',
        href: "https://deltakilowatt.it/"
    }, {
        title: 'I nostri servizi',
        href: "https://deltakilowatt.it/superbonus/"
    },
        {
            title: 'CER',
            href: "https://cer.deltakilowatt.it/?_gl=1%2Aowimto%2A_ga%2ANjM1MTg2OTQxLjE3MTc2Njc5ODg.%2A_ga_GKGP1XTS96%2AMTcxNzY3NTk0My4yLjEuMTcxNzY3NjA1Mi41OC4wLjA.&_ga=2.167934945.1751877275.1717667988-635186941.1717667988"
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
        },

        {
            title: 'Contattaci',
            href: "https://deltakilowatt.it/contattaci/"
        }];
    // const pages = ['Home', 'I nostri servizi', 'Superbonus', 'CER', 'Studio di fattibilità', 'Blog', 'Contattaci'];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "white", color: "Black"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{dispay: "flex", justifyContent: "space-between"}}>
                    <img id={"navLogo"} alt={"Delta Kilowatt"} src={"/assets/Delta_KiloWatt_logoSmall.webp"}
                         className={""}/>
                    <div>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, color: "black"}}>
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
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page, index) => (
                                <a href={page.href} target={"_blank"} key={index}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.title}
                                    </Button>
                                </a>

                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/*ICONE SOCIAL */}
                                {/*{settings.map((setting) => (*/}
                                {/*    <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                                {/*        <Typography textAlign="center">{setting}</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}