import axios from "axios";
import { API_URL } from "../config.js";

export const getTracks = async (page) => axios.get(`${API_URL}/allTracks/${page}`);
export const getScores = async (trackId) => axios.get(`${API_URL}/scores/top/${trackId}`);