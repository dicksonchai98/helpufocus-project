# Notes API Document
Providing various api related to notes, including note list, specific note information, add note.
# Table of contents
- [Notes API Document](#notes-api-document)
- [Table of contents](#table-of-contents)
  - [Note List API](#note-list-api)
  - [Specific Note Information API](#specific-note-information-api)
  - [Add Note API](#add-note-api)

<br>

## Note List API
Get all of notes belong to current user
> Route: /api/notes
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
  "notes": [
    {
      "note_title": "Hahaha",
      "note_book_id": "4HShkzuXdw7LLf8u8Ro8",
      "note_updated_time": 1711410953000,
      "note_created_time": 1711410953000,
      "note_id": "S7MG1dBBh0GM3Z4bs0Ai",
      "note_book_name": "DragonBall"
    },
    {
      "note_title": "Hahaha",
      "note_book_id": "4HShkzuXdw7LLf8u8Ro8",
      "note_updated_time": 1711412217000,
      "note_created_time": 1711412217000,
      "note_id": "wr6bubcoTMue9WsSqmrm",
      "note_book_name": "DragonBall"
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

## Specific Note Information API
Get a specific note information including content
> Route: /api/notes/:id
>
> Method: GET
>
> Token Authentication: Yes, Bearer token authentication

<br>

**URL Parameter:**
| Name | Type   | Require | Others  |
| ---- | ------ | ------- | ------- |
| id   | String | Y       | note id |

Example: /api/notes/4HShkzuXdw7LLf8u8Ro8

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
  "note_content": "ngoiagegg...",
  "note_user_id": "911pO44hhDsqsSljc9Gp",
  "note_title": "Hahaha",
  "note_book_id": "4HShkzuXdw7LLf8u8Ro8",
  "note_updated_time": 1711410953000,
  "note_created_time": 1711410953000,
  "note_id": "S7MG1dBBh0GM3Z4bs0Ai"
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

## Add Note API
Add a new note
> Route: /api/notes
>
> Method: POST
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name         | Type   | Require | Others                    |
| ------------ | ------ | ------- | ------------------------- |
| note_title   | String | Y       | Note title                |
| note_content | Text   | Y       | Note content              |
| note_book_id | String | Y       | Note belong to which book |

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
  "note_id": "rv8d3Q9NRsGA2oTIgRVh"
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
