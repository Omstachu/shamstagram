# API Routes

## Users

- `GET /api/users/` returns all users
- `GET /api/users/<id>` returns a single user with id `<id>`

- `PATCH /api/users/<id>` update profile picture and/or biography of user with id `<id>`

## Authentication
- `GET /api/auth/logout` logs out a user

- `POST /api/auth/login` logs in a user
- `POST /api/auth/signup` signs up a user

## Posts
- `GET /api/posts` returns all posts, including their comments, likes, and images, for the current user's feed (prioritizing followed users)
- `GET /api/posts/users/<id>` returns all posts made by the user with id `<id>`
- `GET /api/posts/<id>` returns a singular post, including their comments, likes, and images.

- `POST /api/posts` creates a new post if the user is logged in, and return post information

- `PUT /api/posts/<id>` updates the description on the post with id `<id>`

- `DELETE /api/posts/<id>` deletes the post with id `<id>`

## Comments
- `GET /api/posts/<id>/comments` return all comments, including their likes,  made on a post with id `<id>`

- `POST /api/posts/<id>/comments` create a new comment attached to a post
- `POST /api/posts/<id>/comments/<id>` create a new comment attached to a comments

- `PUT /api/comments/<id>` update the content on a given comment `<id>`
- `PUT /api/comments/<id>/delete` delete a given comment `<id>`

## Likes

- `POST /api/posts/<id>/likes` create a new like for a post with id `<id>`
- `POST /api/comments/<id>/likes` create a new like for a comment with id `<id>`

- `DELETE /api/posts/<id>/likes` delete the like for a post with id `<id>`
- `DELETE /api/comments/<id>/likes` delete the like for a comment with id `<id>`


## Followers
- `GET /api/users/<id>/following` returns the list of users that are followed by the user with id `<id>`
- `GET /api/users/<id>/followers` returns the list of users that are following the user with id `<id>`

- `POST /api/following/` Create a new follow by the current user for the user attached to a given post or profile page

- `DELETE /api/following/` the current user will stop following the user attached to a given post or profile page

## Images

- `GET /api/users/<id>/images` return all images created by user with id `<id>`

- `POST /api/users/<id>/images` create a new image for the user with id `<id>`
