import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingIndicator = (props) => {
	const style = {
		mainBox: {
			pt: props.small ? 0 : 2,
			pb: props.small ? 0 : 1
		}
	};

	return (
		<Box align="center" sx={style.mainBox}>
			<CircularProgress size={props.small ? "16px" : "32px"} />
		</Box>
	)
};

export default LoadingIndicator;
