import React, { useEffect } from "react";
import { useState } from "react";
import { AxiosService } from "../services";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import StatisticsItem from "../components/Items/StatisticsItem";
import ClientItem from "../components/Items/ClientItem";
import SaleItem from "../components/Items/SaleItem";
import ClientCommunicationItem from "../components/Items/ClientCommunicationItem";
import NoDataMessage from "../components/NoDataMessage";
import LoadingIndicator from "../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		backgroundColor: "#E0EBFF",
		color: "#6B6B6B",
		p: "24px 36px"
	},
	statisticsBox: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
		gap: 3,
		mt: 1,
		mb: 3
	},
	communicationBox: {
		mt: 1,
		mb: 3
	},
	sectionBox: {
		mt: 1,
		mb: 3,
		pb: "20px",
		width: "100%",
		backgroundColor: "#fcfdff",
		borderRadius: 5
	},
	boxLabels: {
		pt: 2,
		pb: 1,
		px: 3,
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		justifyContent: "center",
		color: "#9c9c9c",
		borderBottom: "1px solid #D8DDEB"
	}
};

// var isStrict = (function() { return !this; })();
// console.log("isStrict", isStrict); // true

const Dashboard = () => {
	const [statistics, setStatistics] = useState({
		numberOfClients: null,
		numberOfProducts: null,
		numberOfSales: null,
	});
	const [communication, setCommunication] = useState([]);
	const [clientProducts, setClientProducts] = useState([]);
	const [clients, setClients] = useState([]);
	
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	const statisticsItems = [
		{
			icon: <GroupOutlinedIcon color="primary" />,
			value: statistics.numberOfClients,
			description: "Broj klijenata",
			link: "/klijenti"
		},
		{
			icon: <Inventory2OutlinedIcon color="primary" />,
			value: statistics.numberOfProducts,
			description: "Broj proizvoda",
			link: "/proizvodi"
		},
		{
			icon: <SellOutlinedIcon color="primary" />,
			value: statistics.numberOfSales,
			description: "Broj prodanih proizvoda",
			link: "/prodaje"
		},
	];

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClientCommunication, responseClientProducts, responseClients, responseProducts] = await Promise.all([
					AxiosService.post("/KlijentKomunikacijaSelect", { "KlijentID": 0 }),
					AxiosService.post("/KlijentProizvodSelect", { "KlijentID": 0 }),
					AxiosService.get("/KlijentSelect"),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClientCommunication.data);
				// console.log(responseClientProducts.data);
				// console.log(responseClients.data);
				// console.log(responseProducts.data);
				
				setStatistics({
					numberOfClients: responseClients.data.Klijenti.length,
					numberOfProducts: responseProducts.data.Proizvodi.length,
					numberOfSales: responseClientProducts.data.Proizvodi.length
				});

				let newClientProducts = responseClientProducts.data.Proizvodi.slice(0, 5);
				for (let newClientProduct of newClientProducts) {
					newClientProduct["ProizvodNaziv"] = responseProducts.data.Proizvodi.find(proizvod =>
						proizvod.ID === newClientProduct.ProizvodID
					).Naziv;
				}

				setCommunication(responseClientCommunication.data.Komunikacije.slice(0, 5));
				setClientProducts(newClientProducts);
				setClients(responseClients.data.Klijenti.slice(0, 5));
			} catch (error) {
				setErrorMessage(error.message);
				setSnackbarColor("#F15555");
				setVisible(true);
			}
			setLoading(false);
		}
		mounted();
	}, []);
	
	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Nadzorna ploča (Dashboard)" align="center" />
			<SubHeading text="Statistika" />
			<Box sx={style.statisticsBox}>
				{statisticsItems.map((item, index) => (
					<StatisticsItem object={item} loading={loading} key={index} />
				))}
			</Box>
			<SubHeading text="Posljednje komunikacije" />
			<Box sx={style.communicationBox}>
				{communication.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{communication.map((item, index) => (
					<ClientCommunicationItem communication={item} key={index} />
				))}
			</Box>
			<SubHeading text="Posljednji prodani proizvodi (prodaje)" />
			<Box sx={style.sectionBox}>
				<Box sx={style.boxLabels}>
					<Typography>Klijent</Typography>
					<Typography>Proizvod</Typography>
					<Typography>Datum ugovaranja</Typography>
					<Typography>Naplata (tip i datum)</Typography>
					<Box></Box>
				</Box>
				{clientProducts.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{clientProducts.map((item, index) => (
					<SaleItem clientProduct={item} key={index} />
				))}
			</Box>
			<SubHeading text="Top klijenti" />
			<Box sx={style.sectionBox}>
				<Box sx={style.boxLabels}>
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
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default Dashboard;
