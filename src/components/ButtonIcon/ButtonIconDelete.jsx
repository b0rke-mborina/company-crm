import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const style = {
	icon: {
		color: "#F15555"
	}
};

const ButtonIconDelete = (props) => {
	return (
		<IconButton onClick={props.onClick} aria-label="delete button">
			<DeleteOutlinedIcon sx={style.icon} />
		</IconButton>
	)
};

export default ButtonIconDelete;
