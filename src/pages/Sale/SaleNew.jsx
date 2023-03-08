import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import InputSelect from "../../components/Input/InputSelect";
import InputTextArea from "../../components/Input/InputTextArea";
import InputDate from "../../components/Input/InputDate";
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

const SaleNew = () => {
	let navigate = useNavigate();
	const [clientProduct, setClientProduct] = useState({
		KlijentID: "",
		ProizvodID: "",
		DatumUgovaranja: moment().format("DD.MM.YYYY. HH:mm:ss"),
		DatumNaplate: moment().format("DD.MM.YYYY. HH:mm:ss"),
		TipNaplate: "",
		BrojPonude: "",
		Opis: "",
		Napomena: ""
	});
	
	const [clients, setClients] = useState([]);
	const [products, setProducts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClients, responseProducts] = await Promise.all([
					AxiosService.get("/KlijentSelect"),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClients.data);
				// console.log(responseProducts.data);
				setClients(responseClients.data.Klijenti);
				setProducts(responseProducts.data.Proizvodi);
				// console.log("Clients: " + clients);
				// console.log("Products: " + products);
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
			let responseInsert = await AxiosService.post("/KlijentProizvodInsert", clientProduct);
			// console.log(responseInsert.data);
			if (responseInsert.data.ResponseCode === "1") throw new Error(responseInsert.data.ResponseMessage);
			navigate(`/prodaja/${responseInsert.data.ID}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Dodaj novi prodan proizvod (prodaju)" align="center" />
			<Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					{loading && <LoadingIndicator small={true} />}
					{!loading && <InputSelect items={clients} defaultValue={clientProduct.KlijentID} data={clientProduct.KlijentID}
						disabled={false} name="KlijentID" handleChange={handleChange}
					/>}
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Proizvod" />
					{loading && <LoadingIndicator small={true} />}
					{!loading && <InputSelect items={products} defaultValue={clientProduct.ProizvodID} data={clientProduct.ProizvodID}
						disabled={false} name="ProizvodID" handleChange={handleChange}
					/>}
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum ugovaranja" />
					<InputDate value={null} name="DatumUgovaranja" handleChange={handleChange} disabled={false} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum naplate" />
					<InputDate value={null} name="DatumNaplate" handleChange={handleChange} disabled={false} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Tip naplate" />
					<InputSelect items={paymentTypes} defaultValue={clientProduct.TipNaplate} data={clientProduct.TipNaplate}
						disabled={false} name="TipNaplate" handleChange={handleChange}
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
			</Box>
			<Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default SaleNew;
