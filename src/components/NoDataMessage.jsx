import React from "react";
import Typography from "@mui/material/Typography";

const style = {
	text: {
		pt: 2,
		pb: 1
	}
};

const NoDataMessage = (props) => {
	return (
		<Typography align="center" sx={style.text}>
			{props.list ? "There are no items here..." : "Data unavailable."}
		</Typography>
	)
};

export default NoDataMessage;
