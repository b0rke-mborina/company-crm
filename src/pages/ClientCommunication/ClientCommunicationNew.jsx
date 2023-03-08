import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import InputSelect from "../../components/Input/InputSelect";
import InputTextArea from "../../components/Input/InputTextArea";
import LoadingIndicator from "../../components/LoadingIndicator";
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
	select: {
		backgroundColor: "#E0EBFF",
		padding: "4px 20px",
		borderRadius: 5,
		border: "2px solid #7DA9FA",
		mx: 1
	},
	buttonsBox: {
		pt: "24px",
		textAlign: "center"
	},
	link: {
		textDecoration: "none"
	}
};

const ClientCommunicationNew = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	
	const [client, setClient] = useState({});
	const [clientCommunication, setClientCommunication] = useState({
		KlijentID: id,
		Osoba: "",
		Opis: "",
		Napomena: ""
	});
	
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
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
				// console.log("ClientCommunication: " + clientCommunication);
			} catch (error) {
				setErrorMessage(error.message);
				setSnackbarColor("#F15555");
				setVisible(true);
			}
			setLoading(false);
		}
		mounted();
	}, []);

	const handleChange = (property, value) => {
		const newClientCommunication = clientCommunication;
		newClientCommunication[property] = value;
		setClientCommunication(newClientCommunication);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			let responseInsert = await AxiosService.post("/KlijentKomunikacijaInsert", clientCommunication);
			// console.log(responseInsert.data);
			if (responseInsert.data.ResponseCode === "1") throw new Error(responseInsert.data.ResponseMessage);
			navigate(`/klijent/${id}/komunikacija`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Dodaj novu komunikaciju sa klijentom" align="center" />
			<Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					{loading && <LoadingIndicator small={true} />}
					{!loading && <InputSelect items={[client]} defaultValue={client.ID} data={id} disabled={true} />}
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Osoba" />
					<InputText value={clientCommunication.Osoba} name="Osoba" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Opis" />
					<InputTextArea value={clientCommunication.Opis} name="Opis" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Napomena" />
					<InputTextArea value={clientCommunication.Napomena} name="Napomena" handleChange={handleChange} />
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

export default ClientCommunicationNew;
