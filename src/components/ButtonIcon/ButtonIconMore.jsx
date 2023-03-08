import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const style = {
	icon: {
		color: "#7DA9FA"
	}
};

const ButtonIconMore = () => {
	return (
		<IconButton aria-label="more button">
			<MoreHorizOutlinedIcon sx={style.icon} />
		</IconButton>
	)
};

export default ButtonIconMore;
