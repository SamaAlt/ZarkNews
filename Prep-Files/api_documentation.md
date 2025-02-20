# Zark Newspaper API Documentation


# User Authentication & Authorization API Documentation
## Authentication Required Endpoints
All endpoints that require authentication require the user to be logged in.

**Error Response:**
- **Status Code:** 401 Unauthorized

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "errors": ["Unauthorized"]
}
```

---

## Get Current User

Authenticates the current user and returns their information as a JSON object.

### Require Authentication: **true**

**Request:**

- **Method:** GET
- **URL:** /api/auth
- **Body:** None

**Successful Response:**

- **Status Code:** 200

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "id": "id-of-user",
  "firstName": "Demo",
  "lastName": "Lition",
  "phoneNumber": "123-456-7890",
  "email": "demo@user.io",
  "street": "123 Main St",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "postalCode": "90001",
  "createdAt": "2023-09-03T00:00:00Z",
  "updatedAt": "2023-09-03T00:00:00Z"
}
```

---

## Log in a User

Logs in a current user with valid credentials and returns the current user's information.

### Require Authentication: **true**

**Request:**

- **Method:** POST
- **URL:** /api/auth/login
- **Body:**
```json
{
  "email": "demo@user.io",
  "password": "password"
}
```

**Successful Response:**

- **Status Code:** 200

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "id": "id-of-user",
  "firstName": "Demo",
  "lastName": "Lition",
  "phoneNumber": "123-456-7890",
  "email": "demo@user.io",
  "street": "123 Main St",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "postalCode": "90001",
  "createdAt": "2023-09-03T00:00:00Z",
  "updatedAt": "2023-09-03T00:00:00Z"
}
```

**Error Response (Invalid Credentials):**

- **Status Code:** 401

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "errors": [
    "Invalid email or password"
  ]
}
```

---

## Log out a User

Logs out the current user.

### Require Authentication: **false**

**Request:**

- **Method:** GET
- **URL:** /api/auth/logout
- **Body:** None

**Successful Response:**

**Body:**
```json
{
  "message": "User logged out"
}
```

---

## Sign up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

### Require Authentication: **false**

**Request:**

- **Method:** POST
- **URL:** /api/auth/signup
- **Body:**
```json
{
  "email": "test@gmail.com",
  "password": "password",
  "firstName": "Testo",
  "lastName": "Test",
  "phoneNumber": "123-456-7890",
  "street": "1 E South Street",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "postalCode": "90001"
}
```

**Successful Response:**

- **Status Code:** 200

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "id": "id-of-new-user",
  "firstName": "Testo",
  "lastName": "Test",
  "phoneNumber": "123-456-7890",
  "email": "test@gmail.com",
  "street": "1 E South Street",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "postalCode": "90001",
  "createdAt": "2023-09-04T00:00:00Z",
  "updatedAt": "2023-09-04T00:00:00Z"
}
```

**Error Response (Email Already Exists):**

- **Status Code:** 500

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "errors": [
    "email: Email address is already in use."
  ]
}
```

**Error Response (Validation Errors):**

- **Status Code:** 400

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "errors": [
    "email: Please provide a valid email address.",
    "password: This field is required.",
    "firstName: This field is required.",
    "lastName: This field is required.",
    "phoneNumber: This field is required.",
    "street: This field is required.",
    "city: This field is required.",
    "state: This field is required.",
    "postalCode: This field is required."
  ]
}
```

---


## Articles

### 6. Create Article
- **Description:** Create a new article with text, image URL, video link, and other metadata.
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/articles
    - **Body:**
    ```json
    {
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],  // Array of tags stored as JSON
      "location": "string",
      "contributors": "string",
      "author_id": "id"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],  // Array of tags stored as JSON
      "location": "string",
      "contributors": "string",
      "author_id": "id",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "title: This field is required.",
        "content: This field is required.",
        "author_id: This field is required.",
        "tags: This field is required.",
        "location: This field is required."
      ]
    }
    ```

### 7. Get Articles
- **Description:** Retrieve a list of published articles.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/articles
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    [
      {
        "id": "id",
        "title": "string",
        "content": "string",
        "image_url": "string",
        "youtube_embed_url": "string",
        "tags": ["string"],
        "location": "string",
        "contributors": "string",
        "author_id": "id",
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    ]
    ```

### 8. Update Article
- **Description:** Update an existing article.
- **Require Authentication:** true
- **Request:**
    - **Method:** PUT
    - **URL:** /api/articles/{id}
    - **Body:**
    ```json
    {
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],
      "location": "string",
      "contributors": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],
      "location": "string",
      "contributors": "string",
      "author_id": "id",
      "updated_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Article not found"
      ]
    }
    ```

### 9. Delete Article
- **Description:** Delete an article.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/articles/{id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Article deleted successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Article not found"
      ]
    }
    ```

---

## Article Edits

### 10. Create Article Edit
- **Description:** Create a new article edit and track changes.
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/article_edits
    - **Body:**
    ```json
    {
      "article_id": "id",
      "editor_id": "id",
      "previous_content": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "article_id": "id",
      "editor_id": "id",
      "previous_content": "string",
      "created_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "article_id: This field is required.",
        "editor_id: This field is required."
      ]
    }
    ```

---

## Newsletter Subscriptions

### 11. Subscribe to Newsletter
\- **Description:** Subscribe a reader to a newsletter with preferred frequency and content type.
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/newsletters/subscribe
    - **Body:**
    ```json
    {
      "reader_id": "id",
      "frequency": "daily_morning",
      "content_type": "top_headlines",
      "topics": ["string"],  // Array of topics stored as JSON
      "notification_preferences": ["string"]
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Subscription successful"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "reader_id: This field is required.",
        "frequency: This field is required."
      ]
    }
    ```

### 12. Get Newsletter Subscriptions
- **Description:** Get the subscription details for a reader.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/newsletters/{reader_id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "reader_id": "id",
      "subscriptions": [
        {
          "frequency": "daily_morning",
          "content_type": "top_headlines",
          "topics": ["string"],  // Array of topics stored as JSON
          "notification_preferences": ["string"]
        }
      ]
    }
    ```

### 13. Update Subscription
- **Description:** Update a reader’s subscription settings.
- **Require Authentication:** true
- **Request:**
    - **Method:** PUT
    - **URL:** /api/newsletters/{reader_id}
    - **Body:**
    ```json
    {
      "frequency": "daily_evening",
      "content_type": "in_depth",
      "topics": ["string"],
      "notification_preferences": ["string"]
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Subscription updated successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Subscription not found"
      ]
    }
    ```

### 14. Unsubscribe from Newsletter
- **Description:** Unsubscribe a reader from the newsletter.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/newsletters/{reader_id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Unsubscribed successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Subscription not found"
      ]
    }
    ```

---

## Search Filters

### 15. Create Search Filter
- **Description:** Create a new search filter (e.g., category, tag, location).
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/search_filters
    - **Body:**
    ```json
    {
      "name": "string",
      "type": "category"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "name": "string",
      "type": "category"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "name: This field is required."
      ]
    }
    ```

### 16. Get Search Filters
- **Description:** Retrieve a list of available search filters.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/search_filters
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    [
      {
        "id": "id",
        "name": "string",
        "type": "category"
      }
    ]
    ```

### 17. Delete Search Filter
- **Description:** Delete an existing search filter.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/search_filters/{id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Filter deleted successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Filter not found"
      ]
    }
    ```

---

## Analytics Diagrams

### 18. Create Analytics Diagram
- **Description:** Create a new visual analytics diagram.
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/analytics_diagrams
    - **Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "diagram_url": "string",
      "author_id": "id"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "title": "string",
      "description": "string",
      "diagram_url": "string",
      "author_id": "id",
      "created_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "title: This field is required."
      ]
    }
    ```

### 19. Get Analytics Diagrams
- **Description:** Get a list of created analytics diagrams.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/analytics_diagrams
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    [
      {
        "id": "id",
        "title": "string",
        "description": "string",
        "diagram_url": "string",
        "author_id": "id",
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    ]
    ```

### 20. Update Analytics Diagram
- **Description:** Update an analytics diagram.
- **Require Authentication:** true
- **Request:**
    - **Method:** PUT
    - **URL:** /api/analytics_diagrams/{id}
    - **Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "diagram_url": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "id",
      "title": "string",
      "description": "string",
      "diagram_url": "string",
      "author_id": "id",
      "updated_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Diagram not found"
      ]
    }
    ```

### 21. Delete Analytics Diagram
- **Description:** Delete an analytics diagram.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/analytics_diagrams/{id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Diagram deleted successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Diagram not found"
      ]
    }
    ```

---

## AI-powered Virtual Reporter

### 22. Create AI Summary
- **Description:** Generate an AI summary for an article.
- **Require Authentication:** true
- **Request:**
    - **Method:** POST
    - **URL:** /api/ai_reporters
    - **Body:**
    ```json
    {
      "article_id": "id",
      "summary": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "article_id": "id",
      "summary": "string",
      "created_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 400
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "article_id: This field is required.",
        "summary: This field is required."
      ]
    }
    ```

### 23. Get AI Summary
- **Description:** Retrieve the AI-generated summary for an article.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/ai_reporters/{article_id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "article_id": "id",
      "summary": "string",
      "created_at": "timestamp"
    }
    ```

### 24. Update AI Summary
- **Description:** Update an AI summary based on feedback or new data.
- **Require Authentication:** true
- **Request:**
    - **Method:** PUT
    - **URL:** /api/ai_reporters/{article_id}
    - **Body:**
    ```json
    {
      "summary": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "article_id": "id",
      "summary": "string",
      "updated_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Summary not found"
      ]
    }
    ```

### 25. Delete AI Summary
- **Description:** Delete the AI-generated summary for an article.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/ai_reporters/{article_id}
    - **Body:** None

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "Summary deleted successfully"
    }
    ```

- **Error Response:**
    - **Status Code:** 404
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Summary not found"
      ]
    }
    ```

