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
import InputSelect from "../../components/Input/InputSelect";
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

const SaleDetails = () => {
	const { id } = useParams();
	
	const [clientProduct, setClientProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClientProducts, responseProducts] = await Promise.all([
					AxiosService.post("/KlijentProizvodSelect", { "KlijentID": 0 }),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClientProducts.data);
				// console.log(responseProducts.data);
				let retrievedClientProduct = responseClientProducts.data.Proizvodi.find(klijentProizvod => klijentProizvod.ID === id);
				retrievedClientProduct["Proizvod"] = responseProducts.data.Proizvodi.find(proizvod =>
					proizvod.ID === retrievedClientProduct.ProizvodID
				);

				setClientProduct(retrievedClientProduct);
				// console.log("Sales: " + clientProduct);
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
			{!clientProduct.ID && !loading && <NoDataMessage list={false} />}
			{loading && <LoadingIndicator small={false} />}
			{clientProduct.ID && <MainHeading text="Prodan proizvod (prodaja)" align="center" />}
			{clientProduct.ID && <Box sx={style.mainGrid}>
				<Box sx={style.itemGrid}>
					<InputLabel text="Klijent" />
					<InputSelect items={[{ "ID": clientProduct.KlijentID, "Naziv": clientProduct.KlijentNaziv }]}
						defaultValue={clientProduct.KlijentID} data={clientProduct.KlijentID} disabled={true}
					/>
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Proizvod" />
					<InputSelect items={[clientProduct.Proizvod]} defaultValue={clientProduct.ProizvodID} data={clientProduct.ProizvodID} disabled={true} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum" />
					<InputValue text={clientProduct.Datum} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum ugovaranja" />
					<InputValue text={clientProduct.DatumUgovaranja} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Datum naplate" />
					<InputValue text={clientProduct.DatumNaplate} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Tip naplate" />
					<InputValue text={clientProduct.TipNaplate} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Broj ponude" />
					<InputValue text={clientProduct.BrojPonude} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Opis" />
					<InputValue text={clientProduct.Opis} />
				</Box>
				<Box sx={style.itemGrid}>
					<InputLabel text="Napomena" />
					<InputValue text={clientProduct.Napomena} />
				</Box>
			</Box>}
			{clientProduct.ID && <Box sx={style.buttonsBox}>
				<Link to={`/prodaja/${id}/uredi`} style={style.link}>
					<ButtonEdit />
				</Link>
				<DialogDelete icon={false} address="/KlijentProizvodDelete" navigateTo="/prodaje" id={id} />
				<ButtonBack />
			</Box>}
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default SaleDetails;
