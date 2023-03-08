import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import ButtonIconClose from "../components/ButtonIcon/ButtonIconClose";

const SnackbarFeedbackMessage = (props) => {
	const style = {
		snackbar: {
			maxWidth: "50%",
			backgroundColor: props.bgColor
		}
	};
	
	return (
		<Snackbar
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			open={props.visible}
			autoHideDuration={6000}
			onClose={() => props.setVisible(false)}
			key="bottomright"
		>
			<SnackbarContent
				sx={style.snackbar}
				message={props.message}
				action={<ButtonIconClose onClick={() => props.setVisible(false)} />}
			>
			</SnackbarContent>
		</Snackbar>
	)
};

export default SnackbarFeedbackMessage;
