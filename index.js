import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  if (!req.body.username || !req.body.avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const newUser = { username: req.body.username, avatar: req.body.avatar };
  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  if (!req.body.username || !req.body.tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const newTweet = { username: req.body.username, tweet: req.body.tweet };
  tweets.push(newTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  if (users.length === 0 || tweets.length === 0) {
    res.send("Nenhum usuario cadastrado, ou nenhum tweet no servidor");
    return;
  }
  const allTweets = [];
  for (let i = 0; i < tweets.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (tweets[i].username === users[j].username) {
        let newTweet = { ...tweets[i], avatar: users[j].avatar };
        allTweets.push(newTweet);
      }
    }
  }
  if (allTweets.length <= 10) {
    res.send(allTweets);
  } else {
    const tweetsReturn = [];
    const start = allTweets.length - 10;
    for (let i = start; i < allTweets.length; i++) {
      tweetsReturn.push(allTweets[i]);
    }
    res.send(tweetsReturn);
  }
});

app.listen(5000);
