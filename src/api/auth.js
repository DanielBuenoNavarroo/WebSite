import axios from "axios";
import { API_URL } from "../config.js";

export const registerRequest = async (user) => axios.post(`${API_URL}/register`, user);
export const loginRequest = async (user) => axios.post(`${API_URL}/login`, user);
export const logOut = async () => axios.post('/logout');
export const verifyToken = async () => axios.get('/verify');