# User-facing routes

## `/login`

### Log in page

This page displays a log in form

* `GET /login`
* `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

* `GET /signup`
* `POST /signup`

## `/`

This page displays the 20 most recent posts (prioritizing followed users) as well as a navigation bar with buttons allowing the user to create a new post, head to their profile page, logout, or return to the main page. Users can like posts, remove their like, add a comment to a post, or click a button to view all the comments.

* `GET /posts`
* `GET /posts/:id/comments`
* `POST /posts/:id/likes`
* `POST /posts/:id/comments`
* `DELETE /posts/:id/likes`

## `/posts/:id`

This page will display a singular post containing an image, description, likes, and comments. If the current user is the creator of the post, the page will also have edit and delete buttons. Users can like posts, remove their like, add a comment to a post, or click a button to view all the comments.


* `GET /posts/:id`
* `PUT /posts/:id`
* `DELETE /posts/:id/`

* `GET /posts/:id/comments`
* `POST /posts/:id/likes`
* `POST /posts/:id/comments`
* `DELETE /posts/:id/likes`

## `users/:id`

This page will display a users name, their profile picture, a biography, a follow button, follower/following counts, and all posts made by that user. If the user is the owner of the profile page, they should see an edit button to update the profile and/or their biography
