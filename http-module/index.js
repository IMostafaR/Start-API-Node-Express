const http = require("http");
const fs = require("fs");
const htmlWelcome = fs.readFileSync("./index.html");
const port = 3000;

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

const server = http.createServer((req, res, next) => {
  const { url, method } = req;
  let buffer = "";
  let result;

  // Home endpoint
  if (url == "/" && method == "GET") {
    res.write(htmlWelcome);
    res.end();
  }

  // allUsers GET endpoint
  else if (url == "/allUsers" && method == "GET") {
    res.write(JSON.stringify(users));
    res.end();
  }

  // addUser POST endpoint
  else if (url == "/addUser" && method == "POST") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let isExist = users.find((ele) => ele.email == result.email);
      if (isExist) {
        res.write("Email already exist!");
        res.end();
      } else {
        result.id = userIdCounter++;
        users.push(result);
        res.write(JSON.stringify([{ message: "Added successfully" }, result]));
        res.end();
      }
    });
  }

  // user sort alphabetically GET endpoint
  else if (url == "/sortUsers" && method == "GET") {
    let sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
    res.write(JSON.stringify(sorted));
    res.end();
  }

  // user delete endpoint
  else if (url == "/deleteUser" && method == "DELETE") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = users.findIndex((ele) => ele.email == result.email);
      if (index > -1) {
        users.splice(index, 1);
        res.write("Deleted successfully");
        res.end();
      } else {
        res.write("User isn't exist!");
        res.end();
      }
    });
  }

  // user update endpoint
  else if (url == "/updateUser" && method == "PUT") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = users.findIndex((ele) => ele.email == result.email);
      if (index > -1) {
        users[index] = result;
        res.write(
          JSON.stringify([{ message: "Updated successfully" }, users[index]])
        );
        res.end();
      } else {
        res.write("User isn't exist!");
        res.end();
      }
    });
  }

  // user searchId endpoint
  else if (url == "/searchUserId" && method == "GET") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = users.findIndex((ele) => ele.id == result.id);
      if (index > -1) {
        res.write(JSON.stringify(users[index]));
        res.end();
      } else {
        res.write("User isn't exist!");
        res.end();
      }
    });
  }

  // allPosts GET endpoint
  else if (url == "/allPosts" && method == "GET") {
    res.write(JSON.stringify(posts));
    res.end();
  }

  // addPost POST endpoint
  else if (url == "/addPost" && method == "POST") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let isExist = posts.find((ele) => ele.title == result.title);
      if (isExist) {
        res.write("Post already exist!");
        res.end();
      } else {
        result.id = postIdCounter++;
        posts.push(result);
        res.write(JSON.stringify([{ message: "Added successfully" }, result]));
        res.end();
      }
    });
  }

  // posts reverse GET endpoint
  else if (url == "/reversePosts" && method == "GET") {
    let reversed = [...posts].reverse();
    res.write(JSON.stringify(reversed));
    res.end();
  }

  // post delete endpoint
  else if (url == "/deletePost" && method == "DELETE") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = posts.findIndex((ele) => ele.title == result.title);
      if (index > -1) {
        posts.splice(index, 1);
        res.write("Post deleted successfully");
        res.end();
      } else {
        res.write("Post isn't exist!");
        res.end();
      }
    });
  }

  // post update endpoint
  else if (url == "/updatePost" && method == "PUT") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = posts.findIndex((ele) => ele.title == result.title);
      if (index > -1) {
        posts[index] = result;
        res.write(
          JSON.stringify([{ message: "Updated successfully" }, result])
        );
        res.end();
      } else {
        res.write("Post isn't exist!");
        res.end();
      }
    });
  }

  // post searchId endpoint
  else if (url == "/searchPostId" && method == "GET") {
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      result = JSON.parse(buffer);
      let index = users.findIndex((ele) => ele.id == result.id);
      if (index > -1) {
        res.write(JSON.stringify(posts[index]));
        res.end();
      } else {
        res.write("Post isn't exist!");
        res.end();
      }
    });
  } else {
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});

server.listen(port, () => console.log(`Server is running on ${port} ....`));
