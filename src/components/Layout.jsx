import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

const sidebarNavItems = [
	{
		display: "Dashboard",
		icon: <HomeOutlinedIcon />,
		to: "/",
		section: ""
	},
	{
		display: "Klijenti",
		icon: <GroupOutlinedIcon />,
		to: "/klijenti",
		section: "klijen"
	},
	{
		display: "Proizvodi",
		icon: <Inventory2OutlinedIcon />,
		to: "/proizvodi",
		section: "proizv"
	},
	{
		display: "Prodaje",
		icon: <SellOutlinedIcon color="inherit" />,
		to: "/prodaje",
		section: "prodaj"
	}
];

const Layout = () => {
	const [auth] = useState(true); // setAuth
	const [anchorEl, setAnchorEl] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const location = useLocation();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};

	// change active index
	useEffect(() => {
		const currentPath = location.pathname
		// console.log(currentPath);
		if (currentPath === "/") {
			setActiveIndex(0);
		} else {
			const path = currentPath.substring(1, 7);
			// console.log(path);
			const activeItem = sidebarNavItems.findIndex(item => item.section === path);
			// console.log(activeItem);
			setActiveIndex(path.length === 0 ? 0 : activeItem);
		}
  	}, [location]);

	const [drawerWidth, setWidth] = useState(240);

	const openDrawer = () => {
		setWidth(240);
	};

	const closeDrawer = () => {
		setWidth(0);
	};
	
	const style = {
		mainBox: {
			display: "flex",
			pt: "64px"
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			ml: `${drawerWidth}px`,
			backgroundColor: "#EBF2FF",
			borderBottomLeftRadius: 20,
			borderBottomRightRadius: 20
		},
		toolbarStack: {
			width: "25ch",
			flexGrow: 1,
			fontFamily: "Poppins-Regular"
		},
		toolbarBox: {
			display: "flex",
		},
		toolbarIconButton: {
			mr: 2,
			width: "auto",
			...(drawerWidth && { display: "none" })
		},
		appBarName: {
			m: 0,
			display: "inline-block",
			lineHeight: "48px",
			...(drawerWidth && { display: "none" })
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			"& .MuiDrawer-paper": {
				bgcolor: "#7DA9FA",
				width: drawerWidth,
				border: 0
			}
		},
		leftChevronIconButtonBox: {
			m: 1,
			display: "flex",
			justifyContent: "right"
		},
		navList: {
			py: 0,
			my: 3,
			backgroundColor: "#E0EBFF"
		},
		helperNavItem: {
			backgroundColor: "#7DA9FA"
		},
		navListItemButton: {
			fontFamily: "Poppins-Regular",
			py: 1.5,
			pl: 5
		},
		navListItemIcon: {
			ml: 2,
			width: "20px"
		},
		navListItemText: {
			ml: 3
		},
		appName: {
			m: 3,
			mt: "auto",
			color: "#EEF4FF",
			fontFamily: "Poppins-Regular",
			textAlign: "center"
		}
	};

	return (
		<Box sx={style.mainBox}>
			<AppBar position="fixed" sx={style.appBar}>
				<Toolbar>
					<Stack
						component="div"
						align="left"
						sx={style.toolbarStack}
						spacing={2}
						noValidate
						autoComplete="off"
					>
						<Box sx={style.toolbarBox}>
							<IconButton
								size="large"
								color="#9C9C9C"
								aria-label="open drawer"
								onClick={openDrawer}
								edge="start"
								sx={style.toolbarIconButton}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h5" gutterBottom color="#6B6B6B" sx={style.appBarName}>
								Company CRM
							</Typography>
						</Box>
					</Stack>
					<IconButton size="large" aria-label="notifications" color="#9C9C9C">
						<NotificationsNoneOutlinedIcon />
					</IconButton>
					{auth && (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="#9C9C9C"
							>
								<AccountCircleOutlinedIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" anchor="left" sx={style.drawer}>
				<Box sx={style.leftChevronIconButtonBox}>
					<IconButton size="large" color="#9C9C9C" onClick={closeDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Box>
				<List sx={style.navList}>
					<ListItem className={`${activeIndex === 0 ? "border-radius-bottom-right" : "col-7da9fa"}`}
						sx={style.helperNavItem}
					>
					</ListItem>
					{sidebarNavItems.map((item, index) => (
						<ListItem key={index} disablePadding
							className={`col-eef4ff ${activeIndex === index ? "active" : "col-7da9fa"} ${activeIndex === index - 1 ? "border-radius-top-right" : ""} ${activeIndex === index + 1 ? "border-radius-bottom-right" : ""}`}
						>
							<ListItemButton component={Link} to={item.to} sx={style.navListItemButton}>
								{item.icon}
								<Typography sx={style.navListItemText}>{item.display}</Typography>
							</ListItemButton>
						</ListItem>
					))}
					<ListItem className={`${activeIndex === sidebarNavItems.length -1 ? "border-radius-top-right" : ""}`}
						sx={style.helperNavItem}
					></ListItem>
				</List>
				<Typography variant="h4" gutterBottom sx={style.appName}>
					Company CRM
				</Typography>
			</Drawer>
			<Outlet />
		</Box>
	)
};

export default Layout;