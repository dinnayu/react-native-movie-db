export const API_KEY = "fc69ae8afb318e3ffe8ed397dc523ae5";
export const BASE_URL = "https://api.themoviedb.org/3";
export const API = "?api_key=";
export const LANGUAGE = "language=en-US";

const getReqConfig = (methods, timeout = 30000) => {
	const reqConfig = {
		method: methods,
		timeout: timeout
	};

	return reqConfig;
};

/**
  This class contains basic functionality for service related functionality.
 */
const BaseServices = {
	/** Get request */
	doGet(url) {
		return new Promise((resolve, reject) => {
			fetch(url, getReqConfig("GET"))
				.then(response => {
					this.responseHandler(url, response, resolve, reject);
				})
				.catch(error => reject(error));
		});
    },
    
    /**
	 *
	 * @param {HttpResponse} response
	 * @param {Promise} resolve
	 * @param {Promise} reject
	 */
	responseHandler(url, response, resolve, reject) {
		response.json()
			.then(jsonObj => {
				if (response.status === 200 || response.status === 201) {
					resolve(jsonObj);
				} else {
					reject({
						"error": jsonObj
					});
				}
			})
			.catch(error => reject({
				"error": jsonObj
			}));
	}
}

export default BaseServices;