import React, { useState } from "react";
import moment from "moment/moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

const style = {
	dateTimePicker: {
		backgroundColor: "#E0EBFF",
		borderRadius: 5,
		mx: 1,
		padding: "4px 20px",
		border: "2px solid #7DA9FA",
		outline: "none"
	}
};

const InputDate = (props) => {
	let dateValue = moment();
	// console.log(dateValue)
	if (props.value) dateValue = moment(props.value, "DD.MM.YYYY. HH:mm:ss");
	// console.log(dateValue)
	const [value, setValue] = useState(dateValue);

	const onInputChange = (newValue) => {
		// console.log(newValue.format("DD.MM.YYYY. hh:mm:ss"));
		// console.log(typeof newValue.format("DD.MM.YYYY. hh:mm:ss"));
		props.handleChange(props.name, newValue.format("DD.MM.YYYY. HH:mm:ss"));
		// console.log(newValue);
		setValue(newValue);
	};

	return (
		<DateTimePicker
			name={props.name}
			value={value}
			onChange={(newValue) => {
				onInputChange(newValue);
			}}
			inputFormat="DD.MM.YYYY. HH:mm:ss"
			hiddenLabel
			disabled={props.disabled}
			InputProps={{
				disableUnderline: true
			}}
			renderInput={(params) => <TextField {...params} variant="standard" sx={style.dateTimePicker} />}
		/>
	)
};

export default InputDate;
