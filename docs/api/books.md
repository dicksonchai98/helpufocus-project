# Books API Document
Providing various api related to books, including book list, specific book information, add book.
# Table of contents
- [Books API Document](#books-api-document)
- [Table of contents](#table-of-contents)
  - [Book List API](#book-list-api)
  - [Specific Book Information API](#specific-book-information-api)
  - [Add book API](#add-book-api)

<br>

## Book List API
Get all of books belong to current user
> Route: /api/books
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
  "books": [
    {
      "book_read_page": 0,
      "book_total_page": 100,
      "book_name": "DragonBall",
      "book_user_id": "911pO44hhDsqsSljc9Gp",
      "book_created_time": 1711410864000,
      "book_updated_time": 1711410864000,
      "book_id": "4HShkzuXdw7LLf8u8Ro8",
      "book_image_url": "https://firebasestorage..."
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

## Specific Book Information API
Get a specific book information including notes list
> Route: /api/books/:id
>
> Method: GET
>
> Token Authentication: Yes, Bearer token authentication

<br>

**URL Parameter:**
| Name | Type   | Require | Others  |
| ---- | ------ | ------- | ------- |
| id   | String | Y       | Book id |

Example: /api/books/4HShkzuXdw7LLf8u8Ro8

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
  "notes": [
    {
      "note_title": "Hahaha",
      "note_updated_time": 1711410953000,
      "note_created_time": 1711410953000,
      "note_id": "S7MG1dBBh0GM3Z4bs0Ai"
    },
    {
      "note_title": "Hahaha",
      "note_updated_time": 1711412217000,
      "note_created_time": 1711412217000,
      "note_id": "wr6bubcoTMue9WsSqmrm"
    }
  ],
  "book_read_page": 0,
  "book_total_page": 100,
  "book_name": "DragonBall",
  "book_user_id": "911pO44hhDsqsSljc9Gp",
  "book_created_time": 1711410864000,
  "book_updated_time": 1711410864000,
  "book_id": "4HShkzuXdw7LLf8u8Ro8",
  "book_image_url": "https://firebasestorage..."
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

## Add book API
Add a new book
> Route: /api/books
>
> Method: POST
>
> Content-Type: multipart/form-data
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**

<span style="color: Tomato;">Use multipart/form-data to upload data with image file</span>
| Name            | Type   | Require | Others                        |
| --------------- | ------ | ------- | ----------------------------- |
| book_name       | String | Y       | Book name                     |
| book_total_page | number | Y       | Total page number of the book |
| file            | File   | N       | Book cover photo file         |

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
  "book_id": "rvqfn1WV9rPpMCtjVoJY"
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
