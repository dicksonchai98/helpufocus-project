# Auth API Document
Providing various auth api for user to perform actions related to authentication.
# Table of contents
- [Auth API Document](#auth-api-document)
- [Table of contents](#table-of-contents)
  - [Sign Up API](#sign-up-api)
  - [Login API](#login-api)
  - [Logout API](#logout-api)
  - [Refresh API](#refresh-api)
  - [Change Password API](#change-password-api)

<br>

## Sign Up API
Providing sign up functionality through this api.
> Route: /api/auth/signUp
>
> Method: POST
>
> Token Authentication: No

<br>

**Request Body:**
| Name     | Type   | Require | Others       |
| -------- | ------ | ------- | ------------ |
| username | String | Y       | E.g. "Hank"  |
| password | String | Y       | E.g. "12345" |

<br>

**Error Response:**
| Error Name                | Error Code | Error Message                            | Status Code |
| ------------------------- | ---------- | ---------------------------------------- | ----------- |
| DatabaseDuplicateError409 | 003        | Database has one or more duplicated row. | 409         |
| DatabaseOperationError500 | 002        | Database operation error.                | 500         |
| InputDataError400         | 001        | Input data error.                        | 400         |

<br>

**Successful Response:**
```json
{
  "user_id": "911pO44hhDsqsSljc9Gp",
  "username": "hank"
}
```

<br>

**Failed Response:**
```json
{
  "statusCode": 400,
  "statusMessage": "Input data error.",
  "message": "Input data error.",
  "data": {
    "errorCode": "001",
    "errorMessage": "Input data error."
  }
}
```

<br>

## Login API
User can perform login with this api
> Route: /api/auth/login
>
> Method: POST
>
> Token Authentication: No

<br>

**Request Body:**
| Name     | Type   | Require | Others       |
| -------- | ------ | ------- | ------------ |
| username | String | Y       | E.g. "Hank"  |
| password | String | Y       | E.g. "12345" |

<br>

**Error Response:**
| Error Name        | Error Code | Error Message     | Status Code |
| ----------------- | ---------- | ----------------- | ----------- |
| LoginError401     | 006        | Login error.      | 409         |
| InputDataError400 | 001        | Input data error. | 400         |

<br>

**Successful Response**
```json
{
  "user_id": "911pO44hhDsqsSljc9Gp",
  "username": "hank",
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbGciOiJ...",
  "expire_at": 1711438276
}
```

<br>

**Failed Response**
```json
{
  "statusCode": 401,
  "statusMessage": "Login error.",
  "message": "Login error.",
  "data": {
    "errorCode": "006",
    "errorMessage": "Login error."
  }
}
```

<br>

## Logout API
User can perform logout with this api
> Route: /api/auth/logout
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
| ResourceInvalidError404   | 008        | Resource is invalid.      | 404         |
| DatabaseOperationError500 | 002        | Database operation error. | 500         |
| TokenInvalidError401      | 007        | Token invalid error.      | 401         |

<br>

**Successful Response**
```json
{
  "result": true
}
```

<br>

**Failed Response**
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

## Refresh API
User can use `refresh_token` to obtain new `access_token`
> Route: /api/auth/refresh
>
> Method: POST
>
> Token Authentication: No

<br>

**Request Body:**
| Name          | Type   | Require | Others                     |
| ------------- | ------ | ------- | -------------------------- |
| refresh_token | String | Y       | E.g. eyJhbGciOiJIUzI1Ni... |

<br>

**Error Response:**
| Error Name              | Error Code | Error Message        | Status Code |
| ----------------------- | ---------- | -------------------- | ----------- |
| ResourceInvalidError404 | 008        | Resource is invalid. | 404         |
| TokenInvalidError401    | 007        | Token invalid error. | 401         |
| InputDataError400       | 001        | Input data error.    | 400         |

<br>

**Successful Response**
```json
{
  "id": "911pO44hhDsqsSljc9Gp",
  "username": "hank",
  "access_token": "eyJhbGci...",
  "expire_at": 1711439892
}
```

<br>

**Failed Response**
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

## Change Password API
User can change current password with this api
> Route: /api/auth/changePassword
>
> Method: PATCH
>
> Token Authentication: Yes, Bearer token authentication

<br>

**Request Body:**
| Name             | Type   | Require | Others            |
| ---------------- | ------ | ------- | ----------------- |
| current_password | String | Y       | E.g. "12343gw"    |
| new_password     | String | Y       | E.g. "123btwrb45" |
| confirm_password | String | Y       | E.g. "123b4tbw45" |

<br>

**Error Response:**
| Error Name        | Error Code | Error Message     | Status Code |
| ----------------- | ---------- | ----------------- | ----------- |
| ConfirmPasswordError400     | 011        | Password and confirm password are not the same.      | 400         |
| InputDataError400 | 001        | Input data error. | 400         |
|CurrentPasswordError400| 010 | Current password is wrong.| 400|
| ResourceInvalidError404   | 008        | Resource is invalid.      | 404         |
| DatabaseOperationError500 | 002        | Database operation error.                | 500         |

<br>

**Successful Response**
```json
{
  "result": true
}
```

<br>

**Failed Response**
```json
{
  "statusCode": 400,
  "statusMessage": "Current password is wrong.",
  "message": "Current password is wrong.",
  "data": {
    "errorCode": "010",
    "errorMessage": "Current password is wrong."
  }
}
```

<br>