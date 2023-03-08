import React from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const style = {
	icon: {
		color: "#62DA8B"
	}
};

const ButtonIconEdit = () => {
	return (
		<IconButton aria-label="edit button">
			<EditOutlinedIcon sx={style.icon} />
		</IconButton>
	)
};

export default ButtonIconEdit;
