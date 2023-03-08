import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosService } from "../services";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonIconDelete from "../components/ButtonIcon/ButtonIconDelete";
import ButtonDelete from "../components/Button/ButtonDelete";
import ButtonCancel from "../components/Button/ButtonCancel";
import SnackbarFeedbackMessage from "../components/SnackbarFeedbackMessage";

const style = {
	mainBox: {
		display: "inline"
	},
	dialog: {
		padding: "8px",
		borderRadius: "20px"
	}
};

const DialogDelete = (props) => {
	let navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [snackbarColor, setSnackbarColor] = useState("#F15555");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		setButtonLoading(true);
		try {
			// const delay = ms => new Promise(res => setTimeout(res, ms));
			// await delay(5000);
			let responseDelete = await AxiosService.post(props.address, { "ID": props.id });
			// console.log(responseDelete.data);
			if (responseDelete.data.ResponseCode === "1") throw new Error(responseDelete.data.ResponseMessage);
			handleClose();
			// console.log(location.pathname);
			if (props.navigateTo === location.pathname) {
				navigate(0);
			} else {
				navigate(props.navigateTo);
			}
		} catch (error) {
			setErrorMessage(error.message);
			setSnackbarColor("#F15555");
			setVisible(true);
		}
		setButtonLoading(false);
	};

	let button;
	if (props.icon) {
		button = <ButtonIconDelete onClick={handleClickOpen} />;
	} else {
		button = <ButtonDelete onClick={handleClickOpen} />;
	}

	return (
		<Box sx={style.mainBox}>
			{button}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				PaperProps={{style: style.dialog}}
			>
				<DialogTitle id="alert-dialog-title">
					Izbrisati objekt?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Jeste li sigurni da želite izbrisati ovaj objekt?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<ButtonDelete onClick={handleDelete} loading={buttonLoading} />
					<ButtonCancel onClick={handleClose} autoFocus />
				</DialogActions>
			</Dialog>
			<SnackbarFeedbackMessage visible={visible} setVisible={setVisible} message={errorMessage} bgColor={snackbarColor} />
		</Box>
	)
};

export default DialogDelete;
