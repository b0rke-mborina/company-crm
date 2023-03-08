import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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

const ButtonSave = (props) => {
	return (
		<LoadingButton variant="contained" onClick={props.onClick} loading={props.loading} aria-label="save button" sx={style.button}>
			<SaveOutlinedIcon sx={style.icon} />
			Save
		</LoadingButton>
	)
};

export default ButtonSave;
