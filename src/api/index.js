import axios from "axios"
const mainURL = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://dfcurirhl9.execute-api.us-east-2.amazonaws.com/"
})
export default mainURL