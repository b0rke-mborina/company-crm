import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosService, filterItems } from "../../services";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MainHeading from "../../components/MainHeading";
import ButtonIconAddNew from "../../components/ButtonIcon/ButtonIconAddNew";
import SearchBar from "../../components/SearchBar";
import ClientItem from "../../components/Items/ClientItem";
import NoDataMessage from "../../components/NoDataMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		bgcolor: "#e0ebff",
		p: "24px 36px"
	},
	paper: {
		pb: "24px",
		width: "100%",
		borderRadius: 5
	},
	paperBoxTitleSearch: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "nowrap",
		borderRadius: 1,
		p: 3,
		pb: 2
	},
	headingBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "nowrap"
	},
	paperBoxLabels: {
		py: 1,
		px: 3,
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		justifyContent: "center",
		color: "#9c9c9c",
		backgroundColor: "#fcfdff",
		borderBottom: "1px solid #D8DDEB"
	}
};

const Clients = () => {
	const [clients, setClients] = useState([]);
	const [clientsStorage, setClientsStorage] = useState([]);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseClients = await AxiosService.get("/KlijentSelect");
				// console.log(responseClients.data.Klijenti);
				setClients(responseClients.data.Klijenti);
				setClientsStorage(responseClients.data.Klijenti);
				// console.log("Clients: " + clients);
			} catch (error) {
				setErrorMessage(error.message);
				setSnackbarColor("#F15555");
				setVisible(true);
			}
			setLoading(false);
		}
		mounted();
	}, []);

	useEffect(() => {
		// console.log("Logs searchValue: " + searchValue);
		setClients(filterItems(clientsStorage, searchValue));
	}, [searchValue]);

	return (
		<Box sx={style.mainBox}>
			<Paper elevation={3} sx={style.paper}>
				<Box sx={style.paperBoxTitleSearch}>
					<Box sx={style.headingBox}>
						<MainHeading text="Klijenti"></MainHeading>
						<Link to={"/klijenti/novi"}>
							<ButtonIconAddNew />
						</Link>
					</Box>
					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				</Box>
				<Box sx={style.paperBoxLabels}>
					<Typography>Naziv</Typography>
					<Typography>Grad i država</Typography>
					<Typography>Odgovorna osoba</Typography>
					<Typography>Broj mobitela</Typography>
					<Box></Box>
				</Box>
				{clients.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{clients.map((item, index) => (
					<ClientItem client={item} key={index} />
				))}
			</Paper>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	);
};

export default Clients;
