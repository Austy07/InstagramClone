import React, {useState, useEffect} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from "react-router-dom";
import Menu from '@material-ui/core/Menu'
import MenuItem from "@material-ui/core/MenuItem";


import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';


import Button from "@material-ui/core/Button";


import logo from "../../assets/logo.svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const useStyles = makeStyles((theme) => ({
    grow: {
        display: 'flex',
    },

    marginn: {
        ...theme.mixins.toolbar,
        marginBottom: "1em",

    },


    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    logo: {
        height: "4em",
        [theme.breakpoints.down("md")]: {
            height: "3.5em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "2em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },

    tabContainer: {
        marginLeft: 'auto'

    },
    tab: {
        minWidth: 10,
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const handleChange = (e, value) => {
        setValue(value);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
        setOpen(false)
    }

    return (
        <React.Fragment>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <img alt="company logo" className={classes.logo} src={logo}/>
                    <div className={classes.tabContainer}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                    </div>

                    <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
                        <Tab className={classes.tab} component={Link} to="/home" label="Home"/>
                        <Tab className={classes.tab} component={Link} to="/direct" label="Direct"/>
                        <Tab className={classes.tab} component={Link} to="/discover" label="Discover"/>
                        <Tab
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup={anchorEl ? "true" : undefined}
                            className={classes.tab}
                            onClick={event => handleClick((event))}
                            label="Profile"/>
                        <Tab className={classes.tab} component={Link} to="/reels" label="Reels"/>
                    </Tabs>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ onMouseLeave: handleClose }}
                        >
                        <MenuItem  onClick={() => {
                            handleClose();
                            setValue(3);
                        }} component={Link} to="/profile">
                        Profile
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                setValue(3);
                            }}
                            component={Link} to="/logout" >
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div className={classes.marginn}/>
        </React.Fragment>
    );
}
