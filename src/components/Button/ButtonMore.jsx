import React from "react";
import Button from "@mui/material/Button";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

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

const ButtonMore = () => {
	return (
		<Button variant="contained" size="small" aria-label="more button" sx={style.button}>
			<MoreHorizOutlinedIcon sx={style.icon} />
			More
		</Button>
	)
};

export default ButtonMore;
