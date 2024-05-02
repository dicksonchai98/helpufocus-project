# Posts API Document
Providing various api related to posts, including post list, add note, like post.
# Table of contents
- [Posts API Document](#posts-api-document)
- [Table of contents](#table-of-contents)
  - [Post List API](#post-list-api)
  - [Add Post API](#add-post-api)
  - [Like Post API](#like-post-api)
  - [Delete Post API](#delete-post-api)

<br>

## Post List API
Get all of posts
> Route: /api/posts
>
> Method: GET
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name | Type | Require | Others |
| ---- | ---- | ------- | ------ |

<br>

**Error Response:**
| Error Name                | Error Code | Error Message             | Status Code |
| ------------------------- | ---------- | ------------------------- | ----------- |
| DatabaseOperationError500 | 002        | Database operation error. | 500         |
| TokenInvalidError401      | 007        | Token invalid error.      | 401         |

<br>

**Successful Response:**
```json
{
  "posts": [
    {
      "post_title": "herheh"
      "post_content": "hey",
      "post_user_id": "911pO44hhDsqsSljc9Gp",
      "post_created_time": 1711427692000,
      "post_self": true, // If post belong to user, return true
      "post_likable": true, // If post can click like, return true
      "post_likes": 0,
      "post_id": "G2XCKiVdYV2yX89pP8vq"
    },
    {
      "post_title": "gregeg"
      "post_content": "nbireonbienbekbnladfkbnqhjtyem",
      "post_likes": 1,
      "post_user_id": "911pO44hhDsqsSljc9Gp",
      "post_created_time": 1711412495000,
      "post_self": true, // If post belong to user, return true
      "post_likable": false, // If post can click like, return true
      "post_id": "8uJvO6gVahjoVMcTpJOh"
    }
  ]
}
```

<br>

**Failed Response:**
```json
{
  "statusCode": 401,
  "statusMessage": "Token invalid error.",
  "message": "Token invalid error.",
  "data": {
    "errorCode": "007",
    "errorMessage": "Token invalid error."
  }
}
```

<br>

## Add Post API
Add a new post
> Route: /api/posts
>
> Method: POST
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name         | Type   | Require | Others       |
| ------------ | ------ | ------- | ------------ |
| post_title   | String | Y       | Post title   |
| post_content | Text   | Y       | Post content |

<br>

**Error Response:**
| Error Name                | Error Code | Error Message             | Status Code |
| ------------------------- | ---------- | ------------------------- | ----------- |
| DatabaseOperationError500 | 002        | Database operation error. | 500         |
| TokenInvalidError401      | 007        | Token invalid error.      | 401         |
| InputDataError400         | 001        | Input data error.         | 400         |

<br>

**Successful Response:**
```json
{
  "post_id": "G2XCKiVdYV2yX89pP8vq"
}
```

<br>

**Failed Response:**
```json
{
  "statusCode": 401,
  "statusMessage": "Token invalid error.",
  "message": "Token invalid error.",
  "data": {
    "errorCode": "007",
    "errorMessage": "Token invalid error."
  }
}
```

<br>

## Like Post API
Like a post
> Route: /api/posts/:id
>
> Method: PATCH
>
> Token Authentication: Yes, Bearer token authentication

<br>

**URL Parameter:**
| Name | Type   | Require | Others  |
| ---- | ------ | ------- | ------- |
| id   | String | Y       | post id |

Example: /api/posts/4HShkzuXdw7LLf8u8Ro8

<br>

**Request Body:**
| Name       | Type   | Require | Others                               |
| ---------- | ------ | ------- | ------------------------------------ |
| post_likes | Number | Y       | `1` => like <br> `-1` => cancel like |

<br>

**Error Response:**
| Error Name                | Error Code | Error Message             | Status Code |
| ------------------------- | ---------- | ------------------------- | ----------- |
| DatabaseOperationError500 | 002        | Database operation error. | 500         |
| TokenInvalidError401      | 007        | Token invalid error.      | 401         |
| ResourceInvalidError404   | 008        | Resource is invalid.      | 404         |
| InputDataError400         | 001        | Input data error.         | 400         |

<br>

**Successful Response:**
```json
{
  "result": true
}
```

<br>

**Failed Response:**
```json
{
  "statusCode": 401,
  "statusMessage": "Token invalid error.",
  "message": "Token invalid error.",
  "data": {
    "errorCode": "007",
    "errorMessage": "Token invalid error."
  }
}
```

<br>

## Delete Post API
Delete a post
> Route: /api/posts/:id
>
> Method: Delete
>
> Token Authentication: Yes, Bearer token authentication

<br>

**URL Parameter:**
| Name | Type   | Require | Others  |
| ---- | ------ | ------- | ------- |
| id   | String | Y       | post id |

Example: /api/posts/4HShkzuXdw7LLf8u8Ro8

<br>

**Request Body:**
| Name | Type | Require | Others |
| ---- | ---- | ------- | ------ |

<br>

**Error Response:**
| Error Name                | Error Code | Error Message             | Status Code |
| ------------------------- | ---------- | ------------------------- | ----------- |
| DatabaseOperationError500 | 002        | Database operation error. | 500         |
| TokenInvalidError401      | 007        | Token invalid error.      | 401         |
| ResourceInvalidError404   | 008        | Resource is invalid.      | 404         |

<br>

**Successful Response:**
```json
{
  "result": true
}
```

<br>

**Failed Response:**
```json
{
  "statusCode": 401,
  "statusMessage": "Token invalid error.",
  "message": "Token invalid error.",
  "data": {
    "errorCode": "007",
    "errorMessage": "Token invalid error."
  }
}
```
