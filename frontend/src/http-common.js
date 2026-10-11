import { API_BASE_URL } from './api-config';
import axios from 'axios';

export default axios.create({
	baseURL: `${API_BASE_URL}/`,
	headers: {
		'Content-type': 'application/json',
	},
});
