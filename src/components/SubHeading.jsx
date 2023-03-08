import React from "react";
import Typography from "@mui/material/Typography";

const style = {
	text: {
		fontWeight: "bold",
		pt: 2,
		pb: 1
	}
};

const SubHeading = (props) => {
	return (
		<Typography variant="h6" align={props.align} sx={style.text}>
			{props.text}
		</Typography>
	)
};

export default SubHeading;
