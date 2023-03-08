import React from "react";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
	select: {
		backgroundColor: "#E0EBFF",
		padding: "4px 20px",
		borderRadius: 5,
		border: "2px solid #7DA9FA",
		mx: 1
	}
};

const InputSelect = (props) => {
	const [value, setValue] = useState(props.defaultValue);

	const onInputChange = (event) => {
		setValue(event.target.value);
		props.handleChange(event.target.name, event.target.value);
		// console.log(event.target.value)
	};

	return (
		<Select
			value={value}
			name={props.name}
			defaultValue={props.defaultValue}
			disabled={props.disabled}
			onChange={onInputChange}
			disableUnderline
			variant="standard"
			sx={style.select}
		>
			{props.items.map((item, index) => (
				<MenuItem value={item.ID} key={index}>{item.Naziv}</MenuItem>
			))}
		</Select>
	)
};

export default InputSelect;
