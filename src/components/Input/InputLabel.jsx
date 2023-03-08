import React from "react";
import Typography from "@mui/material/Typography";

const style = {
	text: {
		color: "#82868f",
		fontSize: "14px",
		padding: "4px 20px",
		textAlign: "right",
		mx: 1
	}
};

const InputLabel = (props) => {
	return (
		<Typography variant="body1" sx={style.text}>
			{props.text}
		</Typography>
	)
};

export default InputLabel;
