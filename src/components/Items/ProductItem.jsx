import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonIconMore from "../../components/ButtonIcon/ButtonIconMore";
import ButtonIconEdit from "../../components/ButtonIcon/ButtonIconEdit";
import DialogDelete from "../../components/DialogDelete";

const style = {
	card: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		justifyContent: "space-between",
		height: "162px",
		minWidth: "271px",
		borderRadius: 5,
		overflowWrap: "break-word"
	},
	name: {
		fontWeight: "bold",
		mb: 1
	},
	description: {
		fontSize: "14px"
	}
};

const ProductItem = (props) => {
	return (
		<Card sx={style.card}>
			<CardContent>
				<Typography sx={style.name}>
					{props.product.Naziv.length <= 25 ? props.product.Naziv : props.product.Naziv.substring(0, 25) + "..."}
				</Typography>
				<Typography sx={style.description}>
					{props.product.Opis.length <= 50 ? props.product.Opis : props.product.Opis.substring(0, 50) + "..."}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={`/proizvod/${props.product.ID}`}>
					<ButtonIconMore />
				</Link>
				<Link to={`/proizvod/${props.product.ID}/uredi`}>
					<ButtonIconEdit />
				</Link>
				<DialogDelete icon={true} address="/ProizvodDelete" navigateTo="/proizvodi" id={props.product.ID} />
			</CardActions>
    	</Card>
	)
};

export default ProductItem;
