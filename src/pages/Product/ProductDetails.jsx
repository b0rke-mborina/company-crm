import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosService } from "../../services";
import Box from "@mui/material/Box";
import MainHeading from "../../components/MainHeading";
import InputLabel from "../../components/Input/InputLabel";
import InputValue from "../../components/Input/InputValue";
import DialogDelete from "../../components/DialogDelete";
import ButtonEdit from "../../components/Button/ButtonEdit";
import ButtonBack from "../../components/Button/ButtonBack";
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

const ProductDetails = () => {
	const { id } = useParams();
	
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
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

	return (
		<Box sx={style.mainBox}>
			<MainHeading text="Detalji proizvoda" align="center" />
			{!product.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{product.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Naziv" />
					<InputValue text={product.Naziv} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Opis" />
					<InputValue text={product.Opis} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Cijena" />
					<InputValue text={product.Cijena} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Ostalo" />
					<InputValue text={product.Ostalo} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum" />
					<InputValue text={product.Datum} />
				</Box>
			</Box>}
			{product.ID && <Box sx={style.buttonsBox}>
				<Link to={`/proizvod/${id}/uredi`} style={style.link}>
					<ButtonEdit />
				</Link>
				<DialogDelete icon={false} address="/ProizvodDelete" navigateTo="/proizvodi" id={id} />
				<ButtonBack />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ProductDetails;
