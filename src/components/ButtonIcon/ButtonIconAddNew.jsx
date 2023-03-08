import React from "react";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const style = {
	button: {
		ml: 3
	},
	icon: {
		color: "#4A88FA"
	}
};

const ButtonIconAddNew = () => {
	return (
		<IconButton aria-label="add new button" sx={style.button}>
			<AddOutlinedIcon sx={style.icon} />
		</IconButton>
	)
};

export default ButtonIconAddNew;
