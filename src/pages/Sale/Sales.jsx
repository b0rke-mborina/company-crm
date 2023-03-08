import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosService, filterItems } from "../../services";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MainHeading from "../../components/MainHeading";
import ButtonIconAddNew from "../../components/ButtonIcon/ButtonIconAddNew";
import SearchBar from "../../components/SearchBar";
import SaleItem from "../../components/Items/SaleItem";
import NoDataMessage from "../../components/NoDataMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import SnackbarFeedbackMessage from "../../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		width: "100%",
		bgcolor: "#e0ebff",
		p: "24px 36px"
	},
	paper: {
		pb: "24px",
		width: "100%",
		borderRadius: 5
	},
	paperBoxTitleSearch: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "nowrap",
		borderRadius: 1,
		p: 3,
		pb: 2
	},
	headingBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "nowrap"
	},
	paperBoxLabels: {
		py: 1,
		px: 3,
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		justifyContent: "center",
		color: "#9c9c9c",
		backgroundColor: "#fcfdff",
		borderBottom: "1px solid #D8DDEB"
	}
};

const Sales = () => {
	const [clientProducts, setClientProducts] = useState([]);
	const [clientProductsStorage, setSlientProductsStorage] = useState([]);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");
	const [searchValue, setSearchValue] = useState("");

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

				let newClientProducts = responseClientProducts.data.Proizvodi;
				for (let newClientProduct of newClientProducts) {
					newClientProduct["ProizvodNaziv"] = responseProducts.data.Proizvodi.find(proizvod =>
						proizvod.ID === newClientProduct.ProizvodID
					).Naziv;
				}

				setClientProducts(newClientProducts);
				setSlientProductsStorage(newClientProducts);
				// console.log(newClientProducts);
				// console.log("Sales: " + clientProducts);
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
			<Paper elevation={3} sx={style.paper}>
				<Box sx={style.paperBoxTitleSearch}>
					<Box sx={style.headingBox}>
						<MainHeading text="Prodaje"></MainHeading>
						<Link to={"/prodaje/nova"}>
							<ButtonIconAddNew />
						</Link>
					</Box>
					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				</Box>
				<Box sx={style.paperBoxLabels}>
					<Typography>Klijent</Typography>
					<Typography>Proizvod</Typography>
					<Typography>Datum ugovaranja</Typography>
					<Typography>Naplata (tip i datum)</Typography>
					<Box></Box>
				</Box>
				{clientProducts.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{clientProducts.map((item, index) => (
					<SaleItem clientProduct={item} key={index} />
				))}
			</Paper>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	);
};

export default Sales;
