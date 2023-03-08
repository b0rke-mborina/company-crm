import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const style = {
	button: {
		mx: 2,
		my: 0.5,
		fontWeight: "bold",
		color: "#EEF4FF",
		backgroundColor: "#F15555",
		borderRadius: 5
	},
	icon: {
		color: "#EEF4FF",
		mr: 1
	}
};

const ButtonDelete = (props) => {
	return (
		<LoadingButton variant="contained" onClick={props.onClick} loading={props.loading} aria-label="delete button" sx={style.button}>
			<DeleteOutlinedIcon sx={style.icon} />
			Delete
		</LoadingButton>
	)
};

export default ButtonDelete;
