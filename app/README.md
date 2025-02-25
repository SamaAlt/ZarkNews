
## Zark News API Documentation

To explore the API endpoints, test requests, and view examples of error responses, check out the full API documentation on Postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/40420607/2sAYdeNC6k)

- **Documentation Link**: [Zark Newspaper API Docs](https://documenter.getpostman.com/view/40420607/2sAYdeNC6k)
- **Run in Postman**: Click the button above to import the collection directly into your Postman app.

**Database Schema**

![alt text](db_schema.png)

--- 

# Zark News is a platform where editors manage articles, while readers can view, search, filter content, and subscribe to updates.

## User and Authentication
Authentication Required Endpoints:
- All endpoints that require authentication require the user to be logged in.

### Sign up a User

**Request:**

- **Method:** POST
- **URL:** /api/auth/signup
- **Body**
```json
{
    "firstName": "Mike",
    "lastName": "Mint",
    "email": "mike.mint@zarknews.com",
    "password": "Securepassword123"
}
```

**Example Request** Successful Signup 
- **Body**
```json

{
    "firstName": "Mike",
    "lastName": "Mint",
    "email": "mike.mint@zarknews.com",
    "password": "Securepassword123"
}
```

**Example Response**
- **Status Code:**  200 OK
- **Body**
```json
{
    "created_at": "2025-02-25T01:37:53",
    "email": "mike.mint@zarknews.com",
    "first_name": "Mike",
    "id": 5,
    "last_name": "Mint",
    "role": "editor"
}
```

### Login User

**Request:**

- **Method:** POST
- **URL:** /api/auth/login
- **Body**
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

**Example Request** Successful Login

```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

**Example Response**

- **Body**
```json

{
    "created_at": "2025-02-23T20:15:48",
    "email": "demo@zarknews.com",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "role": "editor"
}
```

### Get All Users

**Request:**

- **Method:** GET
- **URL:** /api/users
- **Body**
```json
{
    "email": "ssie.doe@example.com",
    "password": "securepassword123"
}
```
- **Example Response** 
- **Status Code:**  200 OK
- **Body**
```json
{
    "users": [
        {
            "created_at": "2025-02-23T20:15:48",
            "email": "demo@zarknews.com",
            "first_name": "Demo",
            "id": 1,
            "last_name": "User",
            "role": "editor"
        },
        {
            "created_at": "2025-02-23T20:15:48",
            "email": "amy@zarknews.com",
            "first_name": "Amy",
            "id": 2,
            "last_name": "Dunder",
            "role": "editor"
        },
        {
            "created_at": "2025-02-23T20:15:48",
            "email": "jack@zarknews.com",
            "first_name": "Jack",
            "id": 3,
            "last_name": "Waters",
            "role": "editor"
        },
        {
            "created_at": "2025-02-23T20:15:48",
            "email": "jill@zarknews.com",
            "first_name": "Jill",
            "id": 4,
            "last_name": "Waters",
            "role": "editor"
        },
        {
            "created_at": "2025-02-25T01:37:53",
            "email": "mike.mint@zarknews.com",
            "first_name": "Mike",
            "id": 5,
            "last_name": "Mint",
            "role": "editor"
        },
        {
            "created_at": "2025-02-25T01:38:33",
            "email": "mie.mint@zarknews.com",
            "first_name": "Mike",
            "id": 6,
            "last_name": "Mint",
            "role": "editor"
        }
    ]
}
```


### Get User by Id

**Request:**

- **Method:** GET
- **URL:** /api/users/<id>
- **Body**
```json
{
  "email": "demo@zarknew.com",
  "password": "StrongPassword1"
}
```

- **Example Request** Successful response

```json
{
  "email": "demo@zarknew.com",
  "password": "StrongPassword1"
}
```
- **Example Response**
- **Status Code:**  200 OK
- **Body**
```json

{
    "created_at": "2025-02-23T20:15:48",
    "email": "jill@zarknews.com",
    "first_name": "Jill",
    "id": 4,
    "last_name": "Waters",
    "role": "editor"
}
```

### Update User by Id

**Request:**

- **Method:** PUT
- **URL:** /api/users/<id>
- **Body**
```json
{
  "last_name": "Vance"
}
```

- **Example Request** Successful
- **Body**

```json
{
  "last_name": "Vance"
}
```
- **Example Response** 
- **Status Code:**  200 OK
- **Body**
```json

{
    "created_at": "2025-02-23T20:15:48",
    "email": "jill@zarknews.com",
    "first_name": "Jill",
    "id": 4,
    "last_name": "Vance",
    "role": "editor"
}
```

### Delete a User

**Request:**

- **Method:** POST
- **URL:** /api/users/<id>
- **Body**
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Request** Successful
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Response** 
- **Status Code:**  200 OK
- **Body**
```json

{
    "message": "User deleted successfully"
}
```



### Get Current User

**Request:**

- **Method:** GET
- **URL:** /api/auth
---
- **Example Response** Successful Authentication
- **Body**
```json
{
    "created_at": "2025-02-23T20:15:48",
    "email": "demo@zarknews.com",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "role": "editor"
}
```

### Logout User
Authentication Required

**Request:**

- **Method:** POST
- **URL:** /api/auth/logout
---
- **Example Response** Successful Logout

<html><p> Login Page </p></html>



### Unauthorized Request

**Request:**

- **Method:** GET
- **URL:** /api/auth/unauthorized

---
- **Example Response** 401 Unauthorized

- **Body**
```json

{
    "errors": {
        "message": "Unauthorized"
    }
}
```

## Articles

### Get All Articles
- **Method:** GET
- **URL:** /api/articles
- **Body**
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Request** Successful | All articles
- **Status Code:**  200 OK
- **Body**
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Response**
- **Body**
```json
{
    "articles": [
        {
            "author_id": 1,
            "content": "Exploring the advancements in solar and wind energy technologies.",
            "contributors": "John Doe, Jane Smith",
            "created_at": "2025-02-13T20:15:48.103285",
            "display_type": "headline",
            "id": 1,
            "image_filename": "renewable_energy.jpg",
            "image_url": "/static/uploads/renewable_energy.jpg",
            "location": "Global",
            "section": "technology",
            "tags": [
                "renewable",
                "energy",
                "solar",
                "wind"
            ],
            "title": "The Future of Renewable Energy",
            "updated_at": "2025-02-23T20:15:48",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103559",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/solar_energy"
        },
        {
            "author_id": 2,
            "content": "A curated list of the most innovative gadgets this year.",
            "contributors": "Alice Johnson",
            "created_at": "2025-02-14T20:15:48.103878",
            "display_type": "list",
            "id": 2,
            "image_filename": "tech_gadgets.jpg",
            "image_url": "/static/uploads/tech_gadgets.jpg",
            "location": "USA",
            "section": "technology",
            "tags": [
                "gadgets",
                "tech",
                "2023"
            ],
            "title": "Top 10 Tech Gadgets of 2023",
            "updated_at": "2025-02-23T20:15:48",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103893",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/tech_gadgets"
        },
        {
            "author_id": 3,
            "content": "How recent policy changes are affecting global markets. ",
            "contributors": "Bob Brown",
            "created_at": "2025-02-15T20:15:48.103924",
            "display_type": "sidebar_1",
            "id": 3,
            "image_filename": "global_markets.jpg",
            "image_url": "/static/uploads/global_markets.jpg",
            "location": "International",
            "section": "business",
            "tags": [
                "markets",
                "policies",
                "global"
            ],
            "title": "Global Markets React to New Policies",
            "updated_at": "2025-02-23T20:15:48",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103927",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/global_markets"
        }
    ]
}
```

### Get Article

**Request:**

- **Method:** GET
- **URL:** /api/articles/<id>
---

- **Example Request** Successful Article by ID
- **Status Code:**  200 OK
- **Body**
```json
{
    "author_id": 1,
    "content": "A look at the most anticipated movies of the year. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
    "contributors": "Diana Evans",
    "created_at": "2025-02-17T20:15:48.103971",
    "display_type": "sidebar_2",
    "id": 5,
    "image_filename": "hollywood.jpg",
    "image_url": "/static/uploads/hollywood.jpg",
    "location": "USA",
    "section": "entertainment",
    "tags": [
        "hollywood",
        "movies",
        "blockbusters"
    ],
    "title": "Hollywood's Newest Blockbusters",
    "updated_at": "2025-02-23T20:15:48",
    "version_history": [
        {
            "changes": "Initial version",
            "updated_at": "2025-02-13T20:15:48.103973",
            "version": 1
        }
    ],
    "youtube_embed_url": "https://www.youtube.com/embed/hollywood"
}
```

### Create Article
Authentication Required

**Request:**

- **Method:** POST
- **URL:** /api/articles
- **Body**
```json
{
    "title": "Testing",
    "display_type": "standard",
    "content": "This is the content of my first article.",
    "location": "New York",
    "section": "Technology",
    "tags": ["tech", "innovation", "AI"]
}
```

- **Example Request** Successful new article
- **Body:**
```json
{
    "title": "My First Article",
    "display_type": "standard",
    "content": "This is the content of my first article.",
    "location": "New York",
    "section": "Technology",
    "tags": ["tech", "innovation", "AI"]
}
```

- **Example Response**
- **Body**
```json
{
    "author_id": 1,
    "content": "This is the content of my first article.",
    "contributors": null,
    "created_at": "2025-02-25T13:15:07",
    "display_type": "standard",
    "id": 21,
    "image_filename": null,
    "image_url": null,
    "location": "New York",
    "section": "Technology",
    "tags": [
        "tech",
        "innovation",
        "AI"
    ],
    "title": "My First Article",
    "updated_at": "2025-02-25T13:15:07",
    "version_history": [],
    "youtube_embed_url": null
}
```

### Update Article 
Authentication Required

**Request:**

- **Method:** PUT
- **URL:** /api/articles/<id>
- **Body**
```json
{
  "title": "Testing",
  "content": "Testing",
  "image_filename": "default.jpg",
  "contributors": "Testing, Demo",
  "location": "Chicago"
}
```

- **Example Request** Successful Updates
- **Body**
```json
{
  "title": "Testing",
  "content": "Testing",
  "image_filename": "default.jpg",
  "contributors": "Testing, Demo",
  "location": "Chicago"
}
```

- **Example Response**
- **Status Code:**  200 OK
- **Body**
```json
{
    "author_id": 1,
    "content": "Testing",
    "contributors": "Testing, Demo",
    "created_at": "2025-02-25T13:15:07",
    "display_type": "standard",
    "id": 21,
    "image_filename": "default.jpg",
    "image_url": "/media/uploads/default.jpg",
    "location": "Chicago",
    "section": "Technology",
    "tags": [
        "tech",
        "innovation",
        "AI"
    ],
    "title": "Testing",
    "updated_at": "2025-02-25T14:08:15",
    "version_history": [
        {
            "content": "This is the content of my first article...",
            "display_type": "standard",
            "image_filename": "default.jpg",
            "location": "Virginia",
            "section": "Technology",
            "tags": "[\"tech\", \"innovation\", \"AI\"]",
            "timestamp": "2025-02-25T13:40:12.415070",
            "title": "My Article"
        },
        {
            "content": "This is the content of my first article...",
            "display_type": "standard",
            "image_filename": "default.jpg",
            "location": "Virginia",
            "section": "Technology",
            "tags": "[\"tech\", \"innovation\", \"AI\"]",
            "timestamp": "2025-02-25T13:43:45.077229",
            "title": "My Article updated."
        },
        {
            "content": "Testing",
            "contributors": "Testing, Demo",
            "display_type": "standard",
            "image_filename": "default.jpg",
            "location": "Chicago",
            "section": "Technology",
            "tags": "[\"tech\", \"innovation\", \"AI\"]",
            "timestamp": "2025-02-25T13:56:41.094906",
            "title": "Testing"
        }
    ],
    "youtube_embed_url": null
}
```

### Delete Article
Authentication Required

**Request:**

- **Method:** DELETE
- **URL:** /api/articles/<id>
- **Body**
```json
{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Request** Successful deletion
- **Body**
```json

{
  "email": "demo@zarknews.com",
  "password": "StrongPassword1"
}
```

- **Example Response**
- **Status Code:**  200 OK
- **Body**
```json

{
    "message": "Article deleted successfully"
}
```


### Archive Articles : Older than 7 days
Authentication Required
- Automatic and Admin Access

**Request:**

- **Method:** POST
- **URL:** /api/articles/archive
---
- **Example Response** Successful Archiving
- **Status Code:**  200 OK
- **Body**
```json

{
    "message": "Old articles archived successfully"
}
```

### Get all archived articles.

**Request:**

- **Method:** GET
- **URL:** /api/articles/archive
---
- **Example Response**
- **Status Code:**  200 OK
- **Body**
```json

{
    "archived_articles": [
        {
            "author_id": 2,
            "content": "A curated list of the most innovative gadgets this year.",
            "contributors": "Alice Johnson",
            "created_at": "2025-02-14T20:15:48.103878",
            "display_type": "archived",
            "id": 2,
            "image_filename": "tech_gadgets.jpg",
            "image_url": "/media/uploads/tech_gadgets.jpg",
            "location": "USA",
            "section": "technology",
            "tags": [
                "gadgets",
                "tech",
                "2023"
            ],
            "title": "Top 10 Tech Gadgets of 2023",
            "updated_at": "2025-02-25T14:49:12",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103893",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/tech_gadgets"
        },
        {
            "author_id": 3,
            "content": "How recent policy changes are affecting global markets.",
            "contributors": "Bob Brown",
            "created_at": "2025-02-15T20:15:48.103924",
            "display_type": "archived",
            "id": 3,
            "image_filename": "global_markets.jpg",
            "image_url": "/media/uploads/global_markets.jpg",
            "location": "International",
            "section": "business",
            "tags": [
                "markets",
                "policies",
                "global"
            ],
            "title": "Global Markets React to New Policies",
            "updated_at": "2025-02-25T14:49:12",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103927",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/global_markets"
        },
        {
            "author_id": 4,
            "content": "E-Sports is becoming a major player in the sports industry.",
            "contributors": "Charlie Davis",
            "created_at": "2025-02-16T20:15:48.103948",
            "display_type": "archived",
            "id": 4,
            "image_filename": "esports.jpg",
            "image_url": "/media/uploads/esports.jpg",
            "location": "Global",
            "section": "sports",
            "tags": [
                "esports",
                "gaming",
                "sports"
            ],
            "title": "The Rise of E-Sports",
            "updated_at": "2025-02-25T14:49:12",
            "version_history": [
                {
                    "changes": "Initial version",
                    "updated_at": "2025-02-13T20:15:48.103950",
                    "version": 1
                }
            ],
            "youtube_embed_url": "https://www.youtube.com/embed/esports"
        }
    ]
}
```

### Get Article archived by ID

**Request:**

- **Method:** GET
- **URL:** /api/articles/archive/

---
- **Example Response** 
- **Status Code:**  200 OK
- **Body**
```json

{
    "author_id": 2,
    "content": "A curated list of the most innovative gadgets this year.",
    "contributors": "Alice Johnson",
    "created_at": "2025-02-14T20:15:48.103878",
    "display_type": "archived",
    "id": 2,
    "image_filename": "tech_gadgets.jpg",
    "image_url": "/media/uploads/tech_gadgets.jpg",
    "location": "USA",
    "section": "technology",
    "tags": [
        "gadgets",
        "tech",
        "2023"
    ],
    "title": "Top 10 Tech Gadgets of 2023",
    "updated_at": "2025-02-25T14:49:12",
    "version_history": [
        {
            "changes": "Initial version",
            "updated_at": "2025-02-13T20:15:48.103893",
            "version": 1
        }
    ],
    "youtube_embed_url": "https://www.youtube.com/embed/tech_gadgets"
}
```

### Upload Image
Authentication Required

**Request:**

- **Method:** POST
- **URL:** /api/articles/upload
- **Body** 
    * form-data
    * Key: file type: file
    * Value: /C:/Users/Sama/Desktop/testingUploadRoute.png
    * Describtion: Testing image upload feature

---

- **Example Request** Successful Image upload
    * --form 
    * 'file=@"/C:/Users/Sama/Desktop/testingUploadRoute.png"'

---

- **Example Response**
- **Status Code:**  200 OK

- **Body**
```json
{
    "url": "/media/uploads/testingUploadRoute.png"
}
```

## Subscriptions

### Create Subscription

**Request:**

- **Method:** POST
- **URL:** /api/subscriptions
- **Body**
```json
{
    "first_name": "James",
    "last_name": "Hilton",
    "email": "james.hilton@example.com",
    "frequency": "Weekly",
    "sections": ["world", "technology"],
    "tags": ["breaking-news", "Apple"]
}
```

- **Example Request** Create Subscription
- **URL:** /api/subscriptions' \

```json
{
    "first_name": "Salley",
    "last_name": "Jones",
    "email": "salley.jones@example.com",
    "frequency": "Daily",
    "sections": ["national", "sports"],
    "tags": ["breaking-news", "football"]
}
```
- **Status Code:** 201 CREATED
- **Body**
```json
{
    "email": "salley.jones@example.com",
    "first_name": "Salley",
    "frequency": "Daily",
    "id": 4,
    "last_name": "Jones",
    "sections": [
        "national",
        "sports"
    ],
    "subscribed_at": "2025-02-25T17:35:53",
    "tags": [
        "breaking-news",
        "football"
    ]
}
```

### Delete Subscription by email

**Request:**

- **Method:** DELETE
- **URL:** /api/subscriptions/<email>


**Example Response**
- **Status Code:**  200 OK
- **Response**
- **Body**
```json
{
    "message": "Unsubscribed successfully"
}
```

### Update Subscription by email

**Request:**

- **Method:** PUT
- **URL:** /api/subscriptions/<email>
- **Body**
```json
{
    "sections": ["technology", "business"],
    "tags": ["AI", "startups"],
    "frequency": "Weekly"
}
```

- **Example Request** Successful update
- **Body**
```json
{
    "sections": ["technology", "business"],
    "tags": ["AI", "startups"],
    "frequency": "Weekly"
}
```

**Example Response**
- **Status Code:**  200 OK
- **Body**
```json
{
    "email": "salley.jones@example.com",
    "first_name": "Salley",
    "frequency": "Weekly",
    "id": 4,
    "last_name": "Jones",
    "sections": [
        "technology",
        "business"
    ],
    "subscribed_at": "2025-02-25T17:35:53",
    "tags": [
        "AI",
        "startups"
    ]
}
```

### Get Subscription by email

**Request:**

- **Method:** GET
- **URL:** /api/subscriptions/<email>

---
- **Example Response** 
- **Status Code:**  200 OK
- **Body**
```json
{
    "email": "salley.jones@example.com",
    "first_name": "Salley",
    "frequency": "Weekly",
    "id": 4,
    "last_name": "Jones",
    "sections": [
        "technology",
        "business"
    ],
    "subscribed_at": "2025-02-25T17:35:53",
    "tags": [
        "AI",
        "startups"
    ]
}
```
