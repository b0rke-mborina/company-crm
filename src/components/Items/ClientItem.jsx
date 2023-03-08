import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonIconMore from "../../components/ButtonIcon/ButtonIconMore";
import ButtonIconEdit from "../../components/ButtonIcon/ButtonIconEdit";
import DialogDelete from "../../components/DialogDelete";
import ButtonIconCommunication from "../../components/ButtonIcon/ButtonIconCommunication";
import ButtonIconClientProducts from "../../components/ButtonIcon/ButtonIconClientProducts";

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

const ClientItem = (props) => {
	return (
		<Box sx={style.mainBox}>
			<Typography>{props.client.Naziv}</Typography>
			<Typography>{props.client.Grad}, {props.client.Drzava}</Typography>
			<Typography>{props.client.OdgovornaOsoba}</Typography>
			<Typography>{props.client.BrojTelefona}</Typography>
			<Box sx={style.buttons}>
				<Link to={`/klijent/${props.client.ID}`}>
					<ButtonIconMore />
				</Link>
				<Link to={`/klijent/${props.client.ID}/uredi`}>
					<ButtonIconEdit />
				</Link>
				<DialogDelete icon={true} address="/KlijentDelete" navigateTo="/klijenti" id={props.client.ID} />
				<Link to={`/klijent/${props.client.ID}/komunikacija`}>
					<ButtonIconCommunication />
				</Link>
				<Link to={`/klijent/${props.client.ID}/proizvodi`}>
					<ButtonIconClientProducts />
				</Link>
			</Box>
		</Box>
	)
};

export default ClientItem;
