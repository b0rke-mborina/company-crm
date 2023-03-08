import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import ButtonCancel from "../../components/Button/ButtonCancel";
import DialogDelete from "../../components/DialogDelete";
import ButtonSave from "../../components/Button/ButtonSave";
import InputSelect from "../../components/Input/InputSelect";
import InputTextArea from "../../components/Input/InputTextArea";
import InputDate from "../../components/Input/InputDate";
import NoDataMessage from "../../components/NoDataMessage";
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
	buttonsBox: {
		pt: "24px",
		textAlign: "center"
	},
	link: {
		textDecoration: "none"
	}
};

const ClientCommunicationEdit = () => {
	const { clientId, communicationId } = useParams();
	let navigate = useNavigate();
	
	const [clientCommunication, setClientCommunication] = useState({});
	
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseClientCommunication = await AxiosService.post("/KlijentKomunikacijaSelect", { "KlijentID": clientId });
				// console.log(responseClientCommunication.data.Komunikacije.find(komunikacija => komunikacija.ID === communicationId));
				setClientCommunication(responseClientCommunication.data.Komunikacije.find(komunikacija => komunikacija.ID === communicationId));
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

	const handleChange = (property, value) => {
		const newClientCommunication = clientCommunication;
		newClientCommunication[property] = value;
		setClientCommunication(newClientCommunication);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			let responseUpdate = await AxiosService.post("/KlijentKomunikacijaUpdate", clientCommunication);
			// console.log(responseUpdate.data);
			if (responseUpdate.data.ResponseCode === "1") throw new Error(responseUpdate.data.ResponseMessage);
			navigate(`/klijent/${clientId}/komunikacija`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			{!clientCommunication.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{clientCommunication.ID && <MainHeading text="Uredi komunikaciju sa klijentom" align="center" />}
			{clientCommunication.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					<InputSelect items={[{ "ID": clientId, "Naziv": clientCommunication.KlijentNaziv }]}
						defaultValue={clientId} data={clientCommunication.KlijentID} disabled={true}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum" />
					<InputDate value={clientCommunication.Datum} name="Datum" handleChange={handleChange} disabled={true} />
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
			</Box>}
			{clientCommunication.ID && <Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
				<DialogDelete icon={false} address="/KlijentKomunikacijaDelete"
					navigateTo={`/klijent/${clientId}/komunikacija`}
					id={communicationId}
				/>
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientCommunicationEdit;
