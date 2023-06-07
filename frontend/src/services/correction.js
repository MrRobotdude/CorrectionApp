import http from '../http-common';

class CorrectionDataService {
	processData({ url, fileName }) {
		return http.post('/extract', { url, fileName });
	}

	testing({ url }) {
		return http.get(`/testing/${url}`);
	}

	// delete directory
	// http.post(`/delete-directory`, {path});

	// get text data
	// getTextData({ file }) {
	// 	return http.get('/read-file/', {
	// 		data: {
	// 			file: file,
	// 		},
	// 	});
	// }

	// getAll(page = 0) {
	// 	return http.get(`restaurants?page=${page}`);
	// }

	// get(id) {
	// 	return http.get(`/restaurant?id=${id}`);
	// }

	// find(query, by = 'name', page = 0) {
	// 	return http.get(`restaurants?${by}=${query}&page=${page}`);
	// }

	// createReview(data) {
	// 	return http.post('/review-new', data);
	// }

	// updateReview(data) {
	// 	return http.put('/review-edit', data);
	// }

	// deleteReview(id, userId) {
	// 	return http.delete(`/review-delete?id=${id}`, {
	// 		data: { user_id: userId },
	// 	});
	// }

	// getCuisines(id) {
	// 	return http.get(`/cuisines`);
	// }
}

export default new CorrectionDataService();
