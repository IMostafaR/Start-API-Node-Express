const express = require("express");
const port = 3000;

const app = express();
app.use(express.json());

let userIdCounter = 1;
let postIdCounter = 1;

let users = [
  { name: "Mostafa", age: 30, email: "mostafa@gmail.com" },
  { name: "Ali", age: 22, email: "ali@gmail.com" },
  { name: "Hassan", age: 35, email: "hassan@yahoo.com" },
  { name: "Hamza", age: 27, email: "hamza@yahoo.com" },
];

let posts = [
  {
    title: "Lorem ipsum dolor",
    body: "nam optio beatae accusantium reiciendis omnis sequi, nisiiusto quod error inventore!",
  },
  {
    title: "sit amet consectetur",
    body: "Possimus mollitia ratione cum aliquid quaeexplicabo deserunt aut corrupti est neque sequi eligendi officiis",
  },
  {
    title: "Possimus mollitia ratione",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est",
  },
  {
    title: "Iste natus, suscipit",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi",
  },
];

users.forEach((user) => (user.id = userIdCounter++));
posts.forEach((post) => (post.id = postIdCounter++));

// Home endpoint
app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`);
});

// allUsers GET endpoint
app.get("/allUsers", (req, res, next) => {
  res.json(users);
});

// addUser POST endpoint
app.post("/addUser", (req, res, next) => {
  let isExist = users.find((ele) => ele.email == req.body.email);
  if (isExist) {
    res.send("Email already exist!");
  } else {
    req.body.id = userIdCounter++;
    users.push(req.body);
    res.send([{ message: "Added successfully" }, req.body]);
  }
});

// // user sort alphabetically GET endpoint
app.get("/sortUsers", (req, res, next) => {
  let sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
  res.json(sorted);
});

// user delete endpoint
app.delete("/deleteUser", (req, res, next) => {
  let index = users.findIndex((ele) => ele.email == req.body.email);
  if (index > -1) {
    users.splice(index, 1);
    res.send("Deleted successfully");
  } else {
    res.send("User isn't exist!");
  }
});

// user update endpoint
app.put("/updateUser", (req, res, next) => {
  let index = users.findIndex((ele) => ele.email == req.body.email);
  if (index > -1) {
    users[index] = req.body;
    res.send([{ message: "Updated successfully" }, users[index]]);
  } else {
    res.send("User isn't exist!");
  }
});

// user searchId endpoint
app.get("/searchUserId", (req, res, next) => {
  let index = users.findIndex((ele) => ele.id == req.body.id);
  if (index > -1) {
    res.send(users[index]);
  } else {
    res.send("User isn't exist!");
  }
});

// allPosts GET endpoint
app.get("/allPosts", (req, res, next) => {
  res.json(posts);
});

// addPost POST endpoint
app.post("/addPost", (req, res, next) => {
  let isExist = posts.find((ele) => ele.title == req.body.title);
  if (isExist) {
    res.send("Post already exist!");
  } else {
    req.body.id = postIdCounter++;
    posts.push(req.body);
    res.send([{ message: "Added successfully" }, req.body]);
  }
});

// posts reverse GET endpoint
app.get("/reversePosts", (req, res, next) => {
  let reversed = [...posts].reverse();
  res.json(reversed);
});

// post delete endpoint
app.delete("/deletePost", (req, res, next) => {
  let index = posts.findIndex((ele) => ele.title == req.body.title);
  if (index > -1) {
    posts.splice(index, 1);
    res.send("Deleted successfully");
  } else {
    res.send("Post isn't exist!");
  }
});

// post update endpoint
app.put("/updatePost", (req, res, next) => {
  let index = posts.findIndex((ele) => ele.title == req.body.title);
  if (index > -1) {
    posts[index] = req.body;
    res.send([{ message: "Updated successfully" }, posts[index]]);
  } else {
    res.send("Post isn't exist!");
  }
});
// post searchId endpoint
app.get("/searchPostId", (req, res, next) => {
  let index = posts.findIndex((ele) => ele.id == req.body.id);
  if (index > -1) {
    res.send(posts[index]);
  } else {
    res.send("Post isn't exist!");
  }
});

app.listen(port, () => console.log(`Server is running on ${port} ....`));
