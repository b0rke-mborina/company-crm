import React from "react";
import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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

const ButtonCancel = (props) => {
	return (
		<Button variant="contained" onClick={props.onClick} aria-label="cancel button" sx={style.button}>
			<CancelOutlinedIcon sx={style.icon} />
			Cancel
		</Button>
	)
};

export default ButtonCancel;
