const service = require('@/utils/http');

const api = {
	login: '/wechat/mp_auth',
	signIn: '/login/getOpenid',
	getScore: '/index/index',
	getStep: '/pedometer/user_info',
	getProduct: '/products'
}

const login = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.login,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const signIn = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.signIn,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getScore = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getScore
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getStep = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getStep
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getProduct = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getProduct
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total
				})
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

module.exports = {
	login,
	signIn,
	getScore,
	getStep,
	getProduct
}
