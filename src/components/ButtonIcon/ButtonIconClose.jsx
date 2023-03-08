import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const style = {
	icon: {
		color: "#2A2C2F"
	}
};

const ButtonIconClose = (props) => {
	return (
		<IconButton onClick={props.onClick} aria-label="close snackbar button">
			<CloseOutlinedIcon sx={style.icon} />
		</IconButton>
	)
};

export default ButtonIconClose;
