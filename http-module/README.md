# HTTP Module API Endpoints

This directory contains code for the HTTP module API endpoints. The API provides various endpoints to interact with users and posts data.

## Usage

The code in this module runs with the main server file `index.js` in the root directory.

## Scripts

To run the server:

```shell
node index.js
```

The server will start running on `http://localhost:3000`.

## API Endpoints

- **GET `/`**: Home endpoint that serves an HTML welcome page.
- **GET `/allUsers`**: Fetches all users.
- **POST `/addUser`**: Adds a new user.
- **GET `/sortUsers`**: Fetches users sorted alphabetically.
- **DELETE `/deleteUser`**: Deletes a user.
- **PUT `/updateUser`**: Updates a user.
- **GET `/searchUserId`**: Searches a user by ID.
- **GET `/allPosts`**: Fetches all posts.
- **POST `/addPost`**: Adds a new post.
- **GET `/reversePosts`**: Fetches posts in reverse order.
- **DELETE `/deletePost`**: Deletes a post.
- **PUT `/updatePost`**: Updates a post.
- **GET `/searchPostId`**: Searches a post by ID.

Please refer to the code in `index.js` for more details about each endpoint.
