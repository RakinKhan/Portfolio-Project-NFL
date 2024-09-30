import express from "express";
import authorization from "./api-config.js";
const app = express();
const port = 8000;

async function getData() {
  try {
    const result = await fetch(
      "https://api.mysportsfeeds.com/v2.1/pull/nfl/2024-2025-regular/standings.json",
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Basic ${authorization}`,
          "Content-type": "application/json",
        }),
      }
    );
    const response = await result.json();
    return response["teams"];
  } catch (error) {
    console.log(error);
  }
}

async function getBoxScore(week, abbreviation) {
  try {
    const result = await fetch(
      `https://api.mysportsfeeds.com/v2.1/pull/nfl/2024-2025-regular/week/${week}/games.json?team=${abbreviation}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Basic ${authorization}`,
          "Content-type": "application/json",
        }),
      }
    );
    const response = await result.json();
    console.log(response["games"]);
    return response["games"];
  } catch (error) {
    console.log(error);
  }
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.get("/team", async (req, res) => {
  const data = await getData();
  res.send(data);
});

app.get("/team/:abbreviation", async (req, res) => {
  const data = await getData();
  const team = data.find(
    (team) => team.team.abbreviation === req.params.abbreviation
  );
  res.send(team);
  console.log(req.params.abbreviation);
});

/*----------------------------------------*/

app.get("/boxscore/:week/:abbreviation", async (req, res) => {
  const data = await getBoxScore(req.params.week, req.params.abbreviation);
  console.log(data);
  res.send(data);
});
/*----------------------------------------*/

await app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
