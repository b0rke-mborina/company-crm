import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosService, filterItems } from "../../services";
import Box from "@mui/material/Box";
import ProductItem from "../../components/Items/ProductItem";
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
	}
};

const Products = () => {
	const [products, setProducts] = useState([]);
	const [productsStorage, setProductsStorage] = useState([]);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		async function mounted() {
			setLoading(true);
			try {
				let responseProducts = await AxiosService.get("/ProizvodSelect");
				// console.log(responseProducts.data.Proizvodi);
				setProducts(responseProducts.data.Proizvodi);
				setProductsStorage(responseProducts.data.Proizvodi);
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

	useEffect(() => {
		// console.log("Logs searchValue: " + searchValue);
		setProducts(filterItems(productsStorage, searchValue));
	}, [searchValue]);

	return (
		<Box sx={style.mainBox}>
			<Box sx={style.boxTitleSearch}>
				<Box sx={style.headingBox}>
					<MainHeading text="Proizvodi"></MainHeading>
					<Link to={"/proizvodi/novi"}>
						<ButtonIconAddNew />
					</Link>
				</Box>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
			</Box>
			<Box sx={style.boxItems}>
				{products.length === 0 && !loading && <NoDataMessage list={true} />}
				{loading && <LoadingIndicator small={false} />}
				{products.map((item, index) => (
					<ProductItem product={item} key={index} />
				))}
			</Box>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default Products;
