import React from "react";
import Typography from "@mui/material/Typography";

const style = {
	text: {
		fontWeight: "bold",
		pb: 1
	}
};

const MainHeading = (props) => {
	return (
		<Typography variant="h5" align={props.align} sx={style.text}>
			{props.text}
		</Typography>
	)
};

export default MainHeading;
