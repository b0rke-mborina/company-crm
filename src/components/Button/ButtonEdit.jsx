import React from "react";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const style = {
	button: {
		mx: 2,
		my: 0.5,
		fontWeight: "bold",
		color: "#EEF4FF",
		backgroundColor: "#62DA8B",
		borderRadius: 5
	},
	icon: {
		color: "#EEF4FF",
		mr: 1
	}
};

const ButtonEdit = () => {
	return (
		<Button variant="contained" aria-label="edit button" sx={style.button}>
			<EditOutlinedIcon sx={style.icon} />
			Edit
		</Button>
	)
};

export default ButtonEdit;
