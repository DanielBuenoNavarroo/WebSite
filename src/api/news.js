import axios from "axios";
import { API_URL } from "../config.js";

export const getNewsRequest = async (leng, page) => axios.get(`${API_URL}/news/${leng}/${page}`);
export const getNewRequest = async (id) => axios.get(`${API_URL}/news/${id}`);
