```

<!-- 
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
 -->
