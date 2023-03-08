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

const SaleEdit = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	
	const [clientProduct, setClientProduct] = useState({});
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
				let [responseClientProduct, responseClients, responseProducts] = await Promise.all([
					AxiosService.post("/KlijentProizvodSelect", { "KlijentID": 0 }),
					AxiosService.get("/KlijentSelect"),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClientProduct.data);
				// console.log(responseClients.data);
				// console.log(responseProducts.data);
				setClientProduct(responseClientProduct.data.Proizvodi.find(klijentProizvod => klijentProizvod.ID === id));
				setClients(responseClients.data.Klijenti);
				setProducts(responseProducts.data.Proizvodi);
				// console.log(responseClientProduct.data.Proizvodi.find(klijentProizvod => klijentProizvod.ID === id));
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
			let responseUpdate = await AxiosService.post("/KlijentProizvodUpdate", clientProduct);
			// console.log(responseUpdate.data);
			if (responseUpdate.data.ResponseCode === "1") throw new Error(responseUpdate.data.ResponseMessage);
			navigate(`/prodaja/${id}`);
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
			{clientProduct.ID && <MainHeading text="Uredi prodaju" align="center" />}
			{clientProduct.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					<InputSelect items={clients} defaultValue={clientProduct.KlijentID} data={clientProduct.KlijentID}
						disabled={false} name="KlijentID" handleChange={handleChange}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Proizvod" />
					<InputSelect items={products} defaultValue={clientProduct.ProizvodID} data={clientProduct.ProizvodID}
						disabled={false} name="ProizvodID" handleChange={handleChange}
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
			</Box>}
			{clientProduct.ID && <Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
				<DialogDelete icon={false} address="/KlijentProizvodDelete" navigateTo="/prodaje" id={id} />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default SaleEdit;
