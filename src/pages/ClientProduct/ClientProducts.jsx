import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosService, filterItems } from "../../services";
import Box from "@mui/material/Box";
import ClientProductItem from "../../components/Items/ClientProductItem";
import ButtonBack from "../../components/Button/ButtonBack";
import MainHeading from "../../components/MainHeading";
import SearchBar from "../../components/SearchBar";
import ButtonIconAddNew from "../../components/ButtonIcon/ButtonIconAddNew";
import NoDataMessage from "../../components/NoDataMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		p: "24px 36px"
	},
	boxTitleSearch: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "nowrap",
		bgcolor: "#E0EBFF",
		borderRadius: 1,
		p: 2
	},
	headingBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "nowrap"
	},
	boxItems: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
		gap: 3,
		bgcolor: "#E0EBFF",
		borderRadius: 1,
		p: "24px"
	},
	buttonsBox: {
		pt: "24px",
		textAlign: "center"
	}
};

const ClientProducts = () => {
	const { id } = useParams();
	const [clientProducts, setClientProducts] = useState([]);
	const [clientProductsStorage, setSlientProductsStorage] = useState([]);
	const [client, setClient] = useState({});

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let [responseClient, responseClientProducts, responseProducts] = await Promise.all([
					AxiosService.get("/KlijentSelect"),
					AxiosService.post("/KlijentProizvodSelect", { "KlijentID": id }),
					AxiosService.get("/ProizvodSelect")
				]);
				// console.log(responseClient.data.Klijenti.find(klijent => klijent.ID === id));
				// console.log(responseProducts.data.Proizvodi);
				setClient(responseClient.data.Klijenti.find(klijent => klijent.ID === id));

				// add products to clientProducts
				let newClientProducts = responseClientProducts.data.Proizvodi;
				for (let newClientProduct of newClientProducts) {
					let newProizvod = responseProducts.data.Proizvodi.find(product => product.ID === newClientProduct.ProizvodID);
					newClientProduct["ProizvodNaziv"] = newProizvod.Naziv;
				}
				
				setClientProducts(newClientProducts);
				setSlientProductsStorage(newClientProducts);
				// console.log(newClientProducts);
			} catch (error) {
				setErrorMessage(error.message);
				setSnackbarColor("#F15555");
				setVisible(true);
			}
			setLoading(false);
		}
		mounted();
	}, []);

	useEffect(() => {
		// console.log("Logs searchValue: " + searchValue);
		setClientProducts(filterItems(clientProductsStorage, searchValue));
	}, [searchValue]);

	return (
		<Box sx={style.mainBox}>
			<Box sx={style.boxTitleSearch}>
				<Box sx={style.headingBox}>
					<MainHeading text={`Proizvodi prodani klijentu ${client.Naziv}`}></MainHeading>
					<Link to={`/klijent/${id}/proizvodi/novi`}>
						<ButtonIconAddNew />
					</Link>
				</Box>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
			</Box>
			<Box sx={style.boxItems}>
				{clientProducts.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{clientProducts.map((item, index) => (
					<ClientProductItem clientProduct={item} key={index} />
				))}
			</Box>
			<Box sx={style.buttonsBox}>
				<ButtonBack />
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default ClientProducts;
