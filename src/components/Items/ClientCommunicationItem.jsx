import React from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ButtonIconEdit from "../../components/ButtonIcon/ButtonIconEdit";
import DialogDelete from "../../components/DialogDelete";

const style = {
	mainBox: {
		py: 1,
		px: 2,
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		justifyContent: "center",
		color: "#2A2C2F",
		backgroundColor: "#FCFDFF",
		borderBottom: "1px solid #D8DDEB",
		alignItems: "center"
	},
	communicationItem: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 4,
		backgroundColor: "#7DA9FA",
		my: 1.5,
		p: 2,
		pb: 1
	},
	nameDate: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		fontSize: "14px",
		mb: 1
	},
	name: {
		fontWeight: "bold"
	},
	date: {
		fontSize: "14px"
	},
	contentButtons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		frap: "nowrap"
	},
	description: {
		fontSize: "14px"
	},
	note: {
		fontSize: "14px"
	}
};

const ClientCommunicationItem = (props) => {
	const { id } = useParams();

	return (
		<Paper elevation={3} sx={style.communicationItem}>
			<Box sx={style.nameDate}>
				<Typography sx={style.name}>
					{props.communication.Osoba}
				</Typography>
				<Typography sx={style.date}>
					{props.communication.Datum}
				</Typography>
			</Box>
			<Box sx={style.contentButtons}>
				<Box>
					<Typography sx={style.description}>
						Opis: {props.communication.Opis}
					</Typography>
					<Typography sx={style.note}>
						Napomena: {props.communication.Napomena}
					</Typography>
				</Box>
				<Box>
					<Link to={`/klijent/${id}/komunikacija/${props.communication.ID}/uredi`}>
						<ButtonIconEdit />
					</Link>
					<DialogDelete icon={true} address="/KlijentKomunikacijaDelete"
						navigateTo={`/klijent/${id}/komunikacija`}
						id={props.communication.ID}
					/>
				</Box>
			</Box>
		</Paper>
	)
};

export default ClientCommunicationItem;
