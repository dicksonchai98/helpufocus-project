# Collections API Document
Providing various api related to collections of post.
# Table of contents
- [Collections API Document](#collections-api-document)
- [Table of contents](#table-of-contents)
  - [Get collections API](#get-collections-api)
  - [Collect post API](#collect-post-api)

<br>

## Get collections API
Get the user's collected posts
> Route: /api/collections
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
  "collection_posts": [
    {
      "post_title": "HAHA",
      "post_content": "hey",
      "post_user_id": "911pO44hhDsqsSljc9Gp",
      "post_created_time": 1714457193000,
      "post_id": "CCmadXVb87OBcKhQ1OUL"
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

## Collect post API
Providing an API for users to collect post.
> Route: /api/collections
>
> Method: POST
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name               | Type   | Require | Others                                                    |
| ------------------ | ------ | ------- | --------------------------------------------------------- |
| collection_post_id | String | Y       | Indicate which post wants to collect by providing post id |
| collection_or_not  | Number | Y       | 1 => collected, 0 => uncollected                          |

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
