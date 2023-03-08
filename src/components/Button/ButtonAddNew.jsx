import React from "react";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const style = {
	button: {
		mx: 2,
		my: 0.5,
		fontWeight: "bold",
		color: "#EEF4FF",
		backgroundColor: "#7DA9FA",
		borderRadius: 5
	},
	icon: {
		color: "#EEF4FF",
		mr: 1
	}
};

const ButtonAddNew = () => {
	return (
		<Button variant="contained" aria-label="add new button" sx={style.button}>
			<AddOutlinedIcon sx={style.icon} />
			Add new
		</Button>
	)
};

export default ButtonAddNew;
