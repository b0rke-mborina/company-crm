import React from "react";
import Button from "@mui/material/Button";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

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

const ButtonCommunication = () => {
	return (
		<Button variant="contained" aria-label="communication button" sx={style.button}>
			<QuestionAnswerOutlinedIcon sx={style.icon} />
			Communication
		</Button>
	)
};

export default ButtonCommunication;
