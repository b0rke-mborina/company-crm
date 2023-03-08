import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputValue from "../../components/Input/InputValue";
import DialogDelete from "../../components/DialogDelete";
import ButtonEdit from "../../components/Button/ButtonEdit";
import ButtonBack from "../../components/Button/ButtonBack";
import ButtonCommunication from "../../components/Button/ButtonCommunication";
import ButtonClientProducts from "../../components/Button/ButtonClientProducts";
import NoDataMessage from "../../components/NoDataMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		p: "24px 36px"
	},
	headingBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "nowrap"
	},
	headingButtonsBox: {
		textAlign: "right"
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

const ClientDetails = () => {
	const { id } = useParams();

	const [client, setClient] = useState({});
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseClient = await AxiosService.get("/KlijentSelect");
				// console.log(responseClient.data.Klijenti.find(klijent => klijent.ID === id));
				setClient(responseClient.data.Klijenti.find(klijent => klijent.ID === id));
				// console.log("Client: " + client);
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
			{!client.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{client.ID && <Box sx={style.headingBox}>
				<MainHeading text="Detalji klijenta" align="left" />
				<Box sx={style.headingButtonsBox}>
					<Link to={`/klijent/${id}/proizvodi`} style={style.link}>
						<ButtonClientProducts />
					</Link>
					<Link to={`/klijent/${id}/komunikacija`} style={style.link}>
						<ButtonCommunication />
					</Link>
				</Box>
			</Box>}
			{client.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="VATID (OIB)" />
					<InputValue text={client.VATID} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Naziv" />
					<InputValue text={client.Naziv} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Odgovorna osoba" />
					<InputValue text={client.OdgovornaOsoba} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Broj telefona" />
					<InputValue text={client.BrojTelefona} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Email" />
					<InputValue text={client.Email} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum" />
					<InputValue text={client.Datum} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Adresa" />
					<InputValue text={client.Adresa} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="ZIP" />
					<InputValue text={client.ZIP} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Grad" />
					<InputValue text={client.Grad} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Država" />
					<InputValue text={client.Drzava} />
				</Box>
			</Box>}
			{client.ID && <Box sx={style.buttonsBox}>
				<Link to={`/klijent/${id}/uredi`} style={style.link}>
					<ButtonEdit />
				</Link>
				<DialogDelete icon={false} address="/KlijentDelete" navigateTo="/klijenti" id={id} />
				<ButtonBack />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientDetails;
