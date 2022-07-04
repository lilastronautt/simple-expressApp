const express = require("express");
const fetch = require("node-fetch");
const cookiParser = require("cookie-parser");

const app = express();

const helmet = require("helmet");
app.use(helmet());

app.use(cookiParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

app.get("/data", (req, res, next) => {
  (async function () {
    const country = req.cookies.country;
    try {
      const response = await fetch(
        `https:restcountries.com/v2/name/${country}`
      );
      if (!response.ok) throw res.json({ data: "Enter a Valid Country" });
      const [data] = await response.json();
      res.json({ data: data });
    } catch (e) {
      console.log(e);
    }
  })();
});

app.post("/get_country_data", (req, res, next) => {
  const country = req.body.country;
  res.cookie("country", country);
  res.redirect("/data");
});

app.listen(3000, () => {
  console.log("server is ruuning on port 3000");
});

//https://restcountries.com/v2/name/${country}
