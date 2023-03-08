import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		p: "24px 36px"
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

const ClientNew = () => {
	let navigate = useNavigate();
	const [client, setClient] = useState({
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
	
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	const handleChange = (property, value) => {
		const newClient = client;
		newClient[property] = value;
		setClient(newClient);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		// console.log("started loading");
		// console.log(client);
		// const delay = ms => new Promise(res => setTimeout(res, ms));
		// await delay(5000);
		// console.log("ended loading");
		try {
			let responseInsert = await AxiosService.post("/KlijentInsert", client);
			// console.log(responseInsert.data);
			if (responseInsert.data.ResponseCode === "1") throw new Error(responseInsert.data.ResponseMessage);
			navigate(`/klijent/${responseInsert.data.ID}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Dodaj novog klijenta" align="center" />
			<Box sx={style.mainGrid}>
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
			</Box>
			<Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientNew;
