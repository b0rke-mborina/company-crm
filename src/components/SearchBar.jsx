import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const style = {
	textField: {
		backgroundColor: "#EBF2FF",
		padding: "4px 12px",
		borderRadius: 5
	}
};

const SearchBar = (props) => {
	const [value, onChange] = useState(props.searchValue);

	const handleChange = (event) => {
		onChange(event.target.value);
		props.setSearchValue(event.target.value);
		// console.log(props.searchValue);
	};

	return (
		<TextField
			hiddenLabel
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchOutlinedIcon />
					</InputAdornment>
				),
				disableUnderline: true
			}}
			variant="standard"
			sx={style.textField}
			onChange={(event) => handleChange(event)}
      	value={value}
		/>
	)
};

export default SearchBar;
