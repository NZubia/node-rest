const request = require('supertest');
const {
	DishModel
} = require('../../models/dish.model');

const app = require('../../app');

const {
	setupDB
} = require("../setupDB");

setupDB("testDatabase");

let dish1 , dish2 = null;

describe("Dishes", function(){

	describe("Given a user need the list of dishes", function(){

		beforeEach(async function () {
			dish1 = await new DishModel({
				dishName: "Tacos",
				dishDescription: "Tacos buenos",
				dishImgSrc: "Http://image.com",
				price: 50,
				category: "Tacos"
			}).save();

			dish2 = await new DishModel({
				dishName: "Sopa",
				dishDescription: "Sopa buena",
				dishImgSrc: "Http://sopa.com",
				price: 30,
				category: "Sopa"
			}).save();
		});

		it("Should return the complete list of dishes if no parameter is sent", function(done){
			request(app)
				.get('/dishes/list')
				.expect(200)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body.data[0]).toHaveProperty("price", 50);
						expect(res.body.data[0]).toHaveProperty("_id", dish1._id.toString());

						expect(res.body.data[1]).toHaveProperty("price", 30);
						expect(res.body.data[1]).toHaveProperty("_id", dish2._id.toString());

						expect(res.body.data).toEqual([
							{
								price: 50,
								_id: dish1._id.toString(),
								dishName: 'Tacos',
								dishDescription: 'Tacos buenos',
								dishImgSrc: 'Http://image.com',
								category: 'Tacos',
								__v: 0
							},
							{
								price: 30,
								_id: dish2._id.toString(),
								dishName: 'Sopa',
								dishDescription: 'Sopa buena',
								dishImgSrc: 'Http://sopa.com',
								category: 'Sopa',
								__v: 0
							}
						])
						done();
					}
				});
		});

		it("Should return the only the dishes belonging to category if category is sent", function(done){
			request(app)
				.get('/dishes/list?category=Sopa')
				.expect(200)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						// Ensure dishes number
						expect(res.body.data.length).toBe(1);

						// Validate individual properties
						expect(res.body.data[0]).toHaveProperty("price", 30);
						expect(res.body.data[0]).toHaveProperty("_id", dish2._id.toString());
						expect(res.body.data[0]).toHaveProperty("dishName", "Sopa");

						// Validate complete response
						expect(res.body.data).toEqual([
							{
								price: 30,
								_id: dish2._id.toString(),
								dishName: 'Sopa',
								dishDescription: 'Sopa buena',
								dishImgSrc: 'Http://sopa.com',
								category: 'Sopa',
								__v: 0
							}
						])
						done();
					}
				});
		});

		it("Should return the complete list of dishes if wrong category param is sent", function(done){
			request(app)
				.get('/dishes/list?category=')
				.expect(200)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						// Ensure dishes number
						expect(res.body.data.length).toBe(2);
						done();
					}
				});
		});
	});

	describe("Give a user need create a new dish", function(){

		it("Should create a new dish if all parameters were sent correctly", function(done){
			request(app)
				.post('/dishes/new')
				.send("name=Caldo")
				.send("desc=Caldo bueno")
				.send("img=https://img.com")
				.send("price=25")
				.send("cat=Sopa")
				.expect(200)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						// Ensure dishes number
						expect(res.body.data).toHaveProperty("dishName", "Caldo");
						expect(res.body.data).toHaveProperty("dishDescription", "Caldo bueno");
						expect(res.body.data).toHaveProperty("dishImgSrc", "https://img.com");
						expect(res.body.data).toHaveProperty("price", 25);
						expect(res.body.data).toHaveProperty("category", "Sopa");

						done();
					}
				});
		});

		it("Should return an error if name param is missing", function (done){
			request(app)
				.post('/dishes/new')
				.send("desc=Caldo bueno")
				.send("img=https://img.com")
				.send("price=25")
				.send("cat=Sopa")
				.expect(402)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body).toHaveProperty("message","BAD PARAMETERS");
						expect(res.body.ERROR).toEqual({
							"name": false,
							"desc": true,
							"img": true,
							"price": true,
							"cat": true,
						})
						done();
					}
				});
		});

		it("Should return an error if desc param is missing", function (done){
			request(app)
				.post('/dishes/new')
				.send("name=Caldo")
				.send("img=https://img.com")
				.send("price=25")
				.send("cat=Sopa")
				.expect(402)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body).toHaveProperty("message","BAD PARAMETERS");
						expect(res.body.ERROR).toEqual({
							"name": true,
							"desc": false,
							"img": true,
							"price": true,
							"cat": true,
						})
						done();
					}
				});
		});

		it("Should return an error if img param is missing", function (done){
			request(app)
				.post('/dishes/new')
				.send("name=Caldo")
				.send("desc=Caldo bueno")
				.send("price=25")
				.send("cat=Sopa")
				.expect(402)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body).toHaveProperty("message","BAD PARAMETERS");
						expect(res.body.ERROR).toEqual({
							"name": true,
							"desc": true,
							"img": false,
							"price": true,
							"cat": true,
						})
						done();
					}
				});
		});

		it("Should return an error if price param is missing", function (done){
			request(app)
				.post('/dishes/new')
				.send("name=Caldo")
				.send("desc=Caldo bueno")
				.send("img=https://img.com")
				.send("cat=Sopa")
				.expect(402)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body).toHaveProperty("message","BAD PARAMETERS");
						expect(res.body.ERROR).toEqual({
							"name": true,
							"desc": true,
							"img": true,
							"price": false,
							"cat": true,
						})
						done();
					}
				});
		});

		it("Should return an error if cat param is missing", function (done){
			request(app)
				.post('/dishes/new')
				.send("name=Caldo")
				.send("desc=Caldo bueno")
				.send("img=https://img.com")
				.send("price=25")
				.expect(402)
				.end( async function(err, res) {
					if (err) {
						done(err);
					} else {
						expect(res.body).toHaveProperty("message","BAD PARAMETERS");
						expect(res.body.ERROR).toEqual({
							"name": true,
							"desc": true,
							"img": true,
							"price": true,
							"cat": false,
						})
						done();
					}
				});
		});
	});
});
