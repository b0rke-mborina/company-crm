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
	payment: {
		fontSize: "14px"
	}
};

const ClientProductItem = (props) => {
	return (
		<Card sx={style.card}>
			<CardContent>
				<Typography sx={style.name}>
					{props.clientProduct.ProizvodNaziv.length <= 25
						? props.clientProduct.ProizvodNaziv
						: props.clientProduct.ProizvodNaziv.substring(0, 25) + "..."}
				</Typography>
				<Typography sx={style.payment}>
					{props.clientProduct.DatumNaplate} ({props.clientProduct.TipNaplate})
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={`/klijent/${props.clientProduct.KlijentID}/proizvod/${props.clientProduct.ProizvodID}`}>
					<ButtonIconMore />
				</Link>
				<Link to={`/klijent/${props.clientProduct.KlijentID}/proizvod/${props.clientProduct.ProizvodID}/uredi`}>
					<ButtonIconEdit />
				</Link>
				<DialogDelete icon={true} address="/KlijentProizvodDelete"
					navigateTo={`/klijent/${props.clientProduct.KlijentID}/proizvodi`}
					id={props.clientProduct.ID}
				/>
			</CardActions>
    	</Card>
	)
};

export default ClientProductItem;
