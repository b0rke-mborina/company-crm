import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonMore from "../../components/Button/ButtonMore";
import LoadingIndicator from "../../components/LoadingIndicator";

const style = {
	paper: {
		m: 1,
		p: 2,
		borderRadius: 5
	},
	valueIcon: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		wrap: "nowrap",
		fontWeight: "bold"
	},
	value: {
		fontWeight: "bold",
	},
	description: {
		fontSize: "14px",
		mb: 1
	},
	buttonBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		wrap: "nowrap",
	},
	link: {
		textDecoration: "none",
		textAlign: "center"
	}
};

const StatisticsItem = (props) => {
	return (
		<Paper elevation={3} sx={style.paper}>
			<Box sx={style.valueIcon}>
				{!props.loading && !props.object.value && typeof props.object.value !== "number" &&
					<Typography sx={style.value}>-</Typography>
				}
				{props.loading && <LoadingIndicator small={true} />}
				{!props.loading && props.object.value &&
					<Typography sx={style.value}>{props.object.value}</Typography>
				}
				{props.object.icon}
			</Box>
			<Typography sx={style.description}>{props.object.description}</Typography>
			<Box sx={style.buttonBox}>
				<Link to={props.object.link} style={style.link}>
					<ButtonMore />
				</Link>
			</Box>
		</Paper>
	)
};

export default StatisticsItem;
