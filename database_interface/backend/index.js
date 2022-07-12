const undici = require("undici");
const express = require("express");

(app = express()), (port = process.env.PORT || 8000), (cors = require("cors"));
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
	res.send({ message: "Connected to Backend server!" });
});

app.get("/names", (req, res) => {
	undici
		.fetch("https://restcountries.com/v2/all")
		.then((response) => response.json())
		.then((data) => {
			const names = data.map((country) => {
				return country.name;
			});
			res.send({ names: names });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/info", (req, res) => {
	let country = req.query.country;
	undici
		.fetch(`https://restcountries.com/v2/name/${country}`)
		.then((response) => response.json())
		.then((data) => {
			const info = {};
			info.capital = data[0].capital;
			info.subregion = data[0].subregion;
			res.send(info);
		})
		.catch((error) => {
			console.log(error);
			res.send({ message: "Error" });
		});
});
