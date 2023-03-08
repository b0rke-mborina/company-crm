import React, { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const style = {
	textArea: {
		backgroundColor: "#E0EBFF",
		borderRadius: "20px",
		fontFamily: "inherit",
		fontSize: "inherit",
		padding: "4px 20px",
		border: "2px solid #7DA9FA",
		margin: "0px 8px",
		resize: "vertical",
		outline: "none"
	}
};

const InputTextArea = (props) => {
	const [value, setValue] = useState(props.value);

	const onInputChange = (event) => {
		setValue(event.target.value);
		props.handleChange(event.target.name, event.target.value);
		// console.log(event.target.value)
	};

	return (
		<TextareaAutosize
			name={props.name}
			value={value}
			onChange={onInputChange}
			minRows={3}
			maxRows={20}
			variant="standard"
			style={style.textArea}
		/>
	)
};

export default InputTextArea;
