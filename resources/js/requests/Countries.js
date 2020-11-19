import axios from "axios";
const GetContries = axios.create({
    baseURL: "https://restcountries.eu/rest/v2/all",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});
export default GetContries;