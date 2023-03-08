import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const style = {
	textField: {
		backgroundColor: "#E0EBFF",
		padding: "4px 20px",
		borderRadius: 5,
		border: "2px solid #7DA9FA",
		mx: 1
	}
};

const InputText = (props) => {
	const [value, setValue] = useState(props.value);

	const onInputChange = (event) => {
		setValue(event.target.value);
		props.handleChange(event.target.name, event.target.value);
		// console.log(event.target.value)
	};

	return (
		<TextField
			name={props.name}
      	value={value}
			onChange={onInputChange}
			hiddenLabel
			InputProps={{
				disableUnderline: true
			}}
			variant="standard"
			sx={style.textField}
		/>
	)
};

export default InputText;
