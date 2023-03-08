import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import DialogDelete from "../../components/DialogDelete";
import ButtonSave from "../../components/Button/ButtonSave";
import ButtonCancel from "../../components/Button/ButtonCancel";
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
		gridTemplateColumns: "1fr 2fr",
		my: "4px"
	},
	buttonsBox: {
		pt: "24px",
		textAlign: "center"
	},
	link: {
		textDecoration: "none"
	}
};

const ClientEdit = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	const [client, setClient] = useState({
		ID: "",
		VATID: "",
		Naziv: "",
		OdgovornaOsoba: "",
		BrojTelefona: "",
		Email: "",
		Datum: "",
		Adresa: "",
		ZIP: "",
		Grad: "",
		Drzava: ""
	});
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	const handleChange = (property, value) => {
		const newClient = client;
		newClient[property] = value;
		setClient(newClient);
	};

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseClient = await AxiosService.get("/KlijentSelect");
				// console.log(responseClient.data);
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

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			let responseUpdate = await AxiosService.post("/KlijentUpdate", client);
			// console.log(responseUpdate.data);
			if (responseUpdate.data.ResponseCode === "1") throw new Error(responseUpdate.data.ResponseMessage);
			navigate(`/klijent/${id}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			{!client.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{client.ID && <Box sx={style.headingBox}>
				<MainHeading text="Uredi klijenta" align="left" />
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
					<InputText value={client.VATID} name="VATID" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Naziv" />
					<InputText value={client.Naziv} name="Naziv" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Odgovorna osoba" />
					<InputText value={client.OdgovornaOsoba} name="OdgovornaOsoba" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Broj telefona" />
					<InputText value={client.BrojTelefona} name="BrojTelefona" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Email" />
					<InputText value={client.Email} name="Email" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Adresa" />
					<InputText value={client.Adresa} name="Adresa" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="ZIP" />
					<InputText value={client.ZIP} name="ZIP" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Grad" />
					<InputText value={client.Grad} name="Grad" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Država" />
					<InputText value={client.Drzava} name="Drzava" handleChange={handleChange} />
				</Box>
			</Box>}
			{client.ID && <Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
				<DialogDelete icon={false} address="/KlijentDelete" navigateTo="/klijenti" id={id} />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientEdit;
