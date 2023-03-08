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
import InputTextArea from "../../components/Input/InputTextArea";
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

const ProductNew = () => {
	let navigate = useNavigate();
	const [product, setProduct] = useState({
		Naziv: "",
		Opis: "",
		Cijena: "",
		Ostalo: ""
	});
	
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	const handleChange = (property, value) => {
		const newProduct = product;
		newProduct[property] = value;
		setProduct(newProduct);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			let responseInsert = await AxiosService.post("/ProizvodInsert", product);
			// console.log(responseInsert.data);
			if (responseInsert.data.ResponseCode === "1") throw new Error(responseInsert.data.ResponseMessage);
			navigate(`/proizvod/${responseInsert.data.ID}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Dodaj novi proizvod" align="center" />
			<Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Naziv" />
					<InputText value={product.Naziv} name="Naziv" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Opis" />
					<InputTextArea value={product.Opis} name="Opis" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Cijena" />
					<InputText value={product.Cijena} name="Cijena" handleChange={handleChange} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Ostalo" />
					<InputTextArea value={product.Ostalo} name="Ostalo" handleChange={handleChange} />
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

export default ProductNew;
