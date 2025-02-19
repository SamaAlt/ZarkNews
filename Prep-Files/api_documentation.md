# Zark Newspaper API Documentation

## User Authentication and Management

### 1. User Registration
- **Description:** Register a new user with a company email.
- **Require Authentication:** false (Registration doesn't require authentication, but the user will be logged in immediately after)
- **Request:**
    - **Method:** POST
    - **URL:** /api/users/register
    - **Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "phone_number": "string",
      "address": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "UUID",
      "username": "string",
      "email": "string",
      "phone_number": "string",
      "address": "string",
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
        "email: Please provide a valid email address.",
        "password: This field is required.",
        "username: This field is required.",
        "phone_number: This field is required.",
        "address: This field is required."
      ]
    }
    ```

    - **Status Code:** 409
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "email: Email address is already in use.",
        "username: Username already exists."
      ]
    }
    ```

### 2. User Login
- **Description:** Login a user with email and password.
- **Require Authentication:** false (Login required for gaining access to user resources)
- **Request:**
    - **Method:** POST
    - **URL:** /api/users/login
    - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "access_token": "string",
      "id": "UUID",
      "username": "string",
      "email": "string",
      "phone_number": "string",
      "address": "string",
      "created_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 401
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Invalid email or password"
      ]
    }
    ```

### 3. User Profile
- **Description:** View a user's profile.
- **Require Authentication:** true
- **Request:**
    - **Method:** GET
    - **URL:** /api/users/{id}
    - **Body:** None
    - **Headers:**
      - Content-Type: application/json
      - Authorization: Bearer {access_token}

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "UUID",
      "username": "string",
      "email": "string",
      "phone_number": "string",
      "address": "string",
      "created_at": "timestamp"
    }
    ```

- **Error Response:**
    - **Status Code:** 401
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "errors": [
        "Unauthorized"
      ]
    }
    ```

### 4. Update User Profile
- **Description:** Update user details like name, email, etc.
- **Require Authentication:** true
- **Request:**
    - **Method:** PUT
    - **URL:** /api/users/{id}
    - **Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "phone_number": "string",
      "address": "string"
    }
    ```

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "UUID",
      "username": "string",
      "email": "string",
      "phone_number": "string",
      "address": "string",
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
        "email: Please provide a valid email address.",
        "phone_number: This field is required.",
        "address: This field is required."
      ]
    }
    ```

### 5. Delete User Account
- **Description:** Delete a user account.
- **Require Authentication:** true
- **Request:**
    - **Method:** DELETE
    - **URL:** /api/users/{id}
    - **Body:** None
    - **Headers:**
      - Content-Type: application/json
      - Authorization: Bearer {access_token}

- **Successful Response:**
    - **Status Code:** 200
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "message": "User deleted successfully"
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
        "User not found"
      ]
    }
    ```

---

# Zark Newspaper API Documentation

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
      "tags": ["string"],
      "location": "string",
      "contributors": "string",
      "author_id": "UUID"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "UUID",
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],
      "location": "string",
      "contributors": "string",
      "author_id": "UUID",
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
        "author_id: This field is required."
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
        "id": "UUID",
        "title": "string",
        "content": "string",
        "image_url": "string",
        "youtube_embed_url": "string",
        "tags": ["string"],
        "location": "string",
        "contributors": "string",
        "author_id": "UUID",
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
      "id": "UUID",
      "title": "string",
      "content": "string",
      "image_url": "string",
      "youtube_embed_url": "string",
      "tags": ["string"],
      "location": "string",
      "contributors": "string",
      "author_id": "UUID",
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
      "article_id": "UUID",
      "editor_id": "UUID",
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
      "id": "UUID",
      "article_id": "UUID",
      "editor_id": "UUID",
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
      "reader_id": "UUID",
      "frequency": "daily_morning",
      "content_type": "top_headlines",
      "topics": ["string"],
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
      "reader_id": "UUID",
      "subscriptions": [
        {
          "frequency": "daily_morning",
          "content_type": "top_headlines",
          "topics": ["string"],
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
      "id": "UUID",
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
        "id": "UUID",
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
      "author_id": "UUID"
    }
    ```

- **Successful Response:**
    - **Status Code:** 201
    - **Headers:**
      - Content-Type: application/json
    - **Body:**
    ```json
    {
      "id": "UUID",
      "title": "string",
      "description": "string",
      "diagram_url": "string",
      "author_id": "UUID",
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
        "id": "UUID",
        "title": "string",
        "description": "string",
        "diagram_url": "string",
        "author_id": "UUID",
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
      "id": "UUID",
      "title": "string",
      "description": "string",
      "diagram_url": "string",
      "author_id": "UUID",
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
      "article_id": "UUID",
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
      "article_id": "UUID",
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
      "article_id": "UUID",
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
      "article_id": "UUID",
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

