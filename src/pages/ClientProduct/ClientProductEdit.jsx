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

const paymentTypes = [
	{
		"ID": "mjesečno",
		"Naziv": "mjesečno"
	},
	{
		"ID": "tromjesečno",
		"Naziv": "tromjesečno"
	},
	{
		"ID": "polugodišnje",
		"Naziv": "polugodišnje"
	},
	{
		"ID": "godišnje",
		"Naziv": "godišnje"
	},
];

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

const ClientProductEdit = () => {
	const { clientId, productId } = useParams();
	let navigate = useNavigate();
	
	const [clientProduct, setClientProduct] = useState({});
	const [product, setProduct] = useState([]);

	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClientProduct, responseProduct] = await Promise.all([
					AxiosService.post("/KlijentProizvodSelect", { "KlijentID": clientId }),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClientProduct.data.Proizvodi.find(klijentProizvod => klijentProizvod.ProizvodID === productId));
				// console.log(responseProduct.data.Proizvodi.find(proizvod => proizvod.ID === productId));
				setClientProduct(responseClientProduct.data.Proizvodi.find(klijentProizvod => klijentProizvod.ProizvodID === productId));
				setProduct(responseProduct.data.Proizvodi.find(proizvod => proizvod.ID === productId));
				// console.log("ClientProduct: " + clientProduct);
				// console.log("Product: " + product);
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
		const newClientProduct = clientProduct;
		newClientProduct[property] = value;
		setClientProduct(newClientProduct);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			// console.log(clientProduct);
			let responseUpdate = await AxiosService.post("/KlijentProizvodUpdate", clientProduct);
			// console.log(responseUpdate.data);
			if (responseUpdate.data.ResponseCode === "1") throw new Error(responseUpdate.data.ResponseMessage);
			navigate(`/klijent/${clientId}/proizvod/${productId}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			{!clientProduct.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{clientProduct.ID && <MainHeading text="Uredi proizvod prodan klijentu" align="center" />}
			{clientProduct.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					<InputSelect items={[{ "ID": clientProduct.KlijentID, "Naziv": clientProduct.KlijentNaziv }]} disabled={true}
						defaultValue={clientProduct.KlijentID} data={clientProduct.KlijentID} name="KlijentID" handleChange={handleChange}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Proizvod" />
					<InputSelect items={[product]} defaultValue={clientProduct.ProizvodID} disabled={true}
						data={clientProduct.ProizvodID} name="ProizvodID" handleChange={handleChange}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum ugovaranja" />
					<InputDate value={clientProduct.DatumUgovaranja} name="DatumUgovaranja" handleChange={handleChange} disabled={false} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum naplate" />
					<InputDate value={clientProduct.DatumNaplate} name="DatumNaplate" handleChange={handleChange} disabled={false} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Tip naplate" />
					<InputSelect items={paymentTypes} defaultValue={clientProduct.TipNaplate} disabled={false}
						data={clientProduct.TipNaplate} name="TipNaplate" handleChange={handleChange}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Broj ponude" />
					<InputText value={clientProduct.BrojPonude} name="BrojPonude" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Opis" />
					<InputTextArea value={clientProduct.Opis} name="Opis" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Napomena" />
					<InputTextArea value={clientProduct.Napomena} name="Napomena" handleChange={handleChange} />
				</Box>
			</Box>}
			{clientProduct.ID && <Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
				<DialogDelete icon={false} address="/KlijentProizvodDelete" navigateTo={`/klijent/${clientId}/proizvodi`} id={clientProduct.ID} />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientProductEdit;
