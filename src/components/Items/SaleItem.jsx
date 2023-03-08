import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonIconMore from "../ButtonIcon/ButtonIconMore";
import ButtonIconEdit from "../ButtonIcon/ButtonIconEdit";
import DialogDelete from "../DialogDelete";

const style = {
	mainBox: {
		py: 1,
		px: 3,
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		justifyContent: "center",
		color: "#2A2C2F",
		backgroundColor: "#FCFDFF",
		borderBottom: "1px solid #D8DDEB",
		alignItems: "center"
	},
	buttons: {
		textAlign: "right"
	}
};

const SaleItem = (props) => {
	return (
		<Box sx={style.mainBox}>
			<Typography>{props.clientProduct.KlijentNaziv}</Typography>
			<Typography>{props.clientProduct.ProizvodNaziv}</Typography>
			<Typography>{props.clientProduct.DatumUgovaranja}</Typography>
			<Typography>{props.clientProduct.TipNaplate} ({props.clientProduct.DatumNaplate})</Typography>
			<Box sx={style.buttons}>
				<Link to={`/prodaja/${props.clientProduct.ID}`}>
					<ButtonIconMore />
				</Link>
				<Link to={`/prodaja/${props.clientProduct.ID}/uredi`}>
					<ButtonIconEdit />
				</Link>
				<DialogDelete icon={true} address="/KlijentProizvodDelete" navigateTo="/prodaje" id={props.clientProduct.ID}  />
			</Box>
		</Box>
	)
};

export default SaleItem;
