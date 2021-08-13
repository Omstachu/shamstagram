```javascript
{
    users:{
        1:{
            id: 1,
            imageId: 2,
            username: "Demo",
            email: "demo@demo.com",
            biography: "First user"
        },
        2:{
            id: 2,
            imageId: 2,
            username: "Demo2",
            email: "demo2@demo.com",
            biography: "Clone of Rick"
        }
    },

    posts:{
        1: {
            id: 1,
            imageId: 1,
            userId: 1,
            description: "This is the first image ever made"
        }
    },

    likes:{
        1: {
            id: 1,
            userId: 1,
            commentId: 1,
        },
        2: {
            id: 2,
            userId: 1,
            postId: 1
        }
    },

    comments:{
        1: {
            id: 1,
            userId: 1,
            postId: 1,
            content: "This is the greatest comment of all time",
        }

        2: {
            id: 2,
            userId: 1,
            postId:  1,
            commentId: 1,
            content: "This is a comment on the greatest comment of all time",
        }
    },

    followers:{
        1: {
            id: 1,
            followerId: 1,
            followingId: 2,
        }
    },

    images:{
        1: {
            id: 1,
            url: "https://i.insider.com/602ee9ced3ad27001837f2ac",
            altText: "We're no strangers to love",
        }

        2: {
            id: 2,
            url: "https://music.allaccess.com/wp-content/uploads/2019/11/365x243xshot-1-1024x684.jpg.pagespeed.ic.0sM-qFTY5g.jpg",
            altText: "Rick Astley"
        }
    },

    session: {
      user: {
         id: 1,
         username: 'Demo'
      }
   },

    errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Password must be more than 6 characters"
         "Password cannot be more than 255 characters "
         "Passwords must match"
         "Username cannot exceed 20 characters in length"
         "Username is already in use"
         "Username must be at least 3 characters"
         "Must be a valid email"
         "Email is already in use"
         "Comment cannot exceed 140 characters "
         "Description cannot exceed 140 characters"
         "Biography cannot exceed 140 characters"
         "Post must contain an image"
         "Invalid file format"
      ]
}
