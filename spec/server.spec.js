const request = require('request');

describe('calc', () => {
	it('should multiply 2 and 2', () => {
		expect(2*2).toBe(4)
	})
})


describe('get messages ', () => {
	it('should return 200 OK', (callback) => {
		request('http://localhost:3000/messages', (req, res) => {
			expect(res.statusCode).toEqual(200)
			callback()
		})
	});

	it('should return a list, thats not empty', (callback) => {
		request('http://localhost:3000/messages', (req, res) => {
			expect(JSON.parse(res.body).length).toBeGreaterThan(0)
			callback()
		})
	});
})


describe('get messages from user', () => {
	it('should return 200 OK', (callback) => {
		request('http://localhost:3000/messages/sara', (req, res) => {
			expect(res.statusCode).toEqual(200)
			callback()
		})
	});

	it('name should be Sara', (callback) => {
		request.get('http://localhost:3000/messages/sara', (req, res) => {
			expect(JSON.parse(res.body)[0].name).toEqual('sara');
			callback()
		})
	});

	it('name should be Safinaz', (callback) => {
		request.get('http://localhost:3000/messages/safinaz', (req, res) => {
			expect(JSON.parse(res.body)[0].name).toEqual('safinaz');
			callback()
		})
	});

	it('name should be Lina', (callback) => {
		request.get('http://localhost:3000/messages/lina', (req, res) => {
			expect(JSON.parse(res.body)[0].name).toEqual('lina');
			callback()
		})
	});
});