# Rank API Document
Providing various api related to rank.
# Table of contents
- [Rank API Document](#rank-api-document)
- [Table of contents](#table-of-contents)
  - [Get rank API](#get-rank-api)
  - [Follow user API](#follow-user-api)

<br>

## Get rank API
Get rank information
> Route: /api/rank
>
> Method: GET
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Query**
| Name | Type   | Others                                                                               |
| ---- | ------ | ------------------------------------------------------------------------------------ |
| type | String | Indicate which type of data wants to query('all', 'follow'), 'all' is default value. |

Example: /api/rank?type=follow

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
  "rank": [
    {
      "user_id": "911pO44hhDsqsSljc9Gp",
      "username": "hank",
      "books_finished": 1,
      "books_total": 2
    },
    {
      "user_id": "U866ul20t5JdqYN9t5w4",
      "books_finished": 0,
      "books_total": 5
    },
    {
      "user_id": "dlhTNH4CyR8VNbnjMyLG",
      "username": "Dickson",
      "books_finished": 0,
      "books_total": 1
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

## Follow user API
Providing an API for user to follow another user and we can see the presentation at follow rank page.
> Route: /api/rank/follow
>
> Method: POST
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name           | Type   | Require | Others                                                   |
| -------------- | ------ | ------- | -------------------------------------------------------- |
| follow_user_id | String | Y       | Indicate which user wants to follow by providing user id |
| follow_or_not  | Number | Y       | 1 => follow, 0 => unfollow                               |

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
