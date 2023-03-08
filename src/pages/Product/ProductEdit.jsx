import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputText from "../../components/Input/InputText";
import DialogDelete from "../../components/DialogDelete";
import ButtonSave from "../../components/Button/ButtonSave";
import ButtonCancel from "../../components/Button/ButtonCancel";
import InputTextArea from "../../components/Input/InputTextArea";
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

const ProductEdit = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseProduct = await AxiosService.get("/ProizvodSelect");
				// console.log(responseProduct.data.Proizvodi.find(proizvod => proizvod.ID === id));
				setProduct(responseProduct.data.Proizvodi.find(proizvod => proizvod.ID === id));
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
		const newProduct = product;
		newProduct[property] = value;
		setProduct(newProduct);
	};

	const handleSave = async () => {
		setButtonLoading(true);
		try {
			let responseUpdate = await AxiosService.post("/ProizvodUpdate", product);
			// console.log(responseUpdate.data);
			if (responseUpdate.data.ResponseCode === "1") throw new Error(responseUpdate.data.ResponseMessage);
			navigate(`/proizvod/${id}`);
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	return (
		<Box sx={style.mainBox}>
			{!product.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{product.ID && <MainHeading text="Uredi proizvod" align="center" />}
			{product.ID && <Box sx={style.mainGrid}>
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
			</Box>}
			{product.ID && <Box sx={style.buttonsBox}>
				<ButtonSave onClick={handleSave} loading={buttonLoading} />
				<ButtonCancel onClick={() => navigate(-1)} />
				<DialogDelete icon={false} address="/ProizvodDelete" navigateTo="/proizvodi" id={id} />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ProductEdit;
