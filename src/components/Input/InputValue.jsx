import React from "react";
import Typography from "@mui/material/Typography";

const style = {
	text: {
		color: "#5a5d63",
		padding: "4px 20px",
		mx: 1,
		whiteSpace: "pre-wrap",
		overflowWrap: "break-word"
	}
};

const InputValue = (props) => {
	return (
		<Typography variant="body1" sx={style.text}>
			{props.text}
		</Typography>
	)
};

export default InputValue;
