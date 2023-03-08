import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const style = {
	button: {
		mx: 2,
		my: 0.5,
		fontWeight: "bold",
		color: "#EEF4FF",
		backgroundColor: "#9C9C9C",
		borderRadius: 5
	},
	icon: {
		color: "#EEF4FF",
		mr: 1
	}
};

const ButtonBack = () => {
	let navigate = useNavigate();

	return (
		<Button onClick={() => navigate(-1)} variant="contained" aria-label="back button" sx={style.button}>
			<ArrowBackOutlinedIcon sx={style.icon} />
			Back
		</Button>
	)
};

export default ButtonBack;
