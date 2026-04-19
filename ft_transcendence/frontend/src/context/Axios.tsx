import axios from "axios";

const Axios = axios.create({
  baseURL : `${process.env.REACT_APP_HOST_URI}/api/v1`,
	timeout: 2000
})

export default Axios
