import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AxiosService, filterItems } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import ButtonIconAddNew from "../../components/ButtonIcon/ButtonIconAddNew";
import InputValue from "../../components/Input/InputValue";
import ClientCommunicationItem from "../../components/Items/ClientCommunicationItem";
import ButtonBack from "../../components/Button/ButtonBack";
import NoDataMessage from "../../components/NoDataMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";
import SearchBar from "../../components/SearchBar";

const style = {
	mainBox: {
		width: "100%",
		p: "24px 36px"
	},
	headBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	headingBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "nowrap"
	},
	searchBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "nowrap"
	},
	mainGrid: {
		pt: "24px",
		display: "grid",
		gridTemplateColumns: "1fr"
	},
	itemGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)"
	},
	buttonsBox: {
		pt: "24px",
		textAlign: "center"
	},
	link: {
		textDecoration: "none"
	}
};

const ClientCommunication = () => {
	const { id } = useParams();
	
	const [client, setClient] = useState(null);
	const [clientCommunication, setClientCommunication] = useState([]);
	const [clientCommunicationStorage, setClientCommunicationStorage] = useState([]);
	
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClient, responseClientCommunication] = await Promise.all([
					AxiosService.get("/KlijentSelect"),
					AxiosService.post("/KlijentKomunikacijaSelect", { "KlijentID": id })
				]);
				// console.log(responseClient.data.Klijenti.find(klijent => klijent.ID === id));
				// console.log(responseClientCommunication.data.Komunikacije);
				setClient(responseClient.data.Klijenti.find(klijent => klijent.ID === id));
				setClientCommunication(responseClientCommunication.data.Komunikacije);
				setClientCommunicationStorage(responseClientCommunication.data.Komunikacije);
				// console.log("Client" + client);
				// console.log("ClientCommunication" + clientCommunication);
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
		setClientCommunication(filterItems(clientCommunicationStorage, searchValue));
	}, [searchValue]);

	return (
		<Box sx={style.mainBox}>
			{client && !loading && <Box sx={style.headBox}>
				<Box sx={style.headingBox}>
					<MainHeading text={`Komunikacija s klijentom ${client.Naziv}`} />
					<Link to={`/klijent/${id}/komunikacija/nova`}>
						<ButtonIconAddNew />
					</Link>
				</Box>
				<InputValue text={`${client.Email}\n${client.BrojTelefona}`} />
			</Box>}
			<Box sx={style.searchBox}>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
			</Box>
			<Box sx={style.mainGrid}>
					{clientCommunication.length === 0 && !loading && <NoDataMessage list={true} />}
					{loading && <LoadingIndicator small={false} />}
					{clientCommunication.map((item, index) => (
						<ClientCommunicationItem communication={item} key={index} />
					))}
			</Box>
			<Box sx={style.buttonsBox}>
				<ButtonBack />
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientCommunication;
