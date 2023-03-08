import axios from "axios";

// axios service for making requests to backend
const AxiosService = axios.create({
	baseURL: "API_URL_GOES_HERE",
	timeout: 6000
});

function filterItems(listOfObjects, searchString) {
	if (searchString.trim() === "") return listOfObjects;
	let keywords = searchString.split(" ").filter(str => str !== "");

	// get list of objects which fit the search
	let result = listOfObjects.filter(object => {
		// make a copy of the object (to not modify the original object), remove unnecessary pairs, and make its keys and values lowercase
		let objectForSearch = JSON.parse(JSON.stringify(object));
		Object.keys(objectForSearch).forEach(key => {
			if ((key.includes("id") && key !== "vatid") || typeof objectForSearch[key] === "object") delete objectForSearch[key];
		});
		Object.keys(objectForSearch).forEach(key => {
			const value = objectForSearch[key];
			delete objectForSearch[key];
			objectForSearch[key.toLowerCase()] = value.toLowerCase();
		});
		// console.log("objectForSearch");
		// console.log(objectForSearch);
		
		// get list of values in object which include keyword
		let objectValuesList = Object.values(objectForSearch);
		// console.log(objectValuesList);
		let valuesList = objectValuesList.filter(property => includesKeyword(property, keywords));
		// console.log(valuesList);

		// return boolean based on number of values which include keyword (same as filter)
		if (valuesList.length > 0) return true;
		else return false;
	});

	// console.log(result);
	return result;
}

function includesKeyword(item, keywords) {
	if (typeof keywords === "string") return item.includes(keywords);
	else return keywords.some(keyword => item.includes(keyword));
}

export { AxiosService, filterItems };
