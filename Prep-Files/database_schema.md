# Database Schema

# Layout
![alt text](db_schema.png)


# Database Schema
## users
| Column Name      | Data Type        | Constraints                                                |
|------------------|------------------|------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                |
| first_name       | VARCHAR(100)     | NOT NULL                                                   |
| last_name        | VARCHAR(100)     | NOT NULL                                                   |
| email            | VARCHAR(255)     | NOT NULL, UNIQUE                                           |
| password_hash    | VARCHAR(255)     | NOT NULL                                                   |
| role             | ENUM('editor', 'admin') | NOT NULL                                            |
| created_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                  |

## articles
| Column Name      | Data Type        | Constraints                                                |
|------------------|------------------|------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                |
| title            | VARCHAR(255)     | NOT NULL                                                   |
| display_type     | VARCHAR(50)      | NOT NULL                                                   |
| content          | TEXT             | NOT NULL                                                   |
| image_filename   | VARCHAR(255)     |                                                            |
| youtube_embed_url| VARCHAR(255)     |                                                            |
| location         | VARCHAR(255)     | NOT NULL                                                   |
| contributors     | TEXT             |                                                            |
| author_id        | INT              | NOT NULL, FOREIGN KEY (author_id) REFERENCES users(id)     |
| section          | VARCHAR(50)      | NOT NULL                                                   |
| tags             | TEXT             | NOT NULL, DEFAULT '[]'                                     |
| created_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                  |
| updated_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                  |
| version_history  | TEXT             | DEFAULT '[]'                                               |

## subscriptions
| Column Name      | Data Type        | Constraints                                                |
|------------------|------------------|------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                |
| first_name       | VARCHAR(100)     | NOT NULL                                                   |
| last_name        | VARCHAR(100)     | NOT NULL                                                   |
| email            | VARCHAR(255)     | NOT NULL, UNIQUE                                           |
| frequency        | ENUM('Daily', 'Weekly', 'Monthly') | NOT NULL                                 |
| sections         | TEXT             | DEFAULT '[]'                                               |
| tags             | TEXT             | DEFAULT '[]'                                               |
| subscribed_at    | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                  |

## search_filters
| Column Name      | Data Type        | Constraints                                                |
|------------------|------------------|------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                |
| name             | VARCHAR(255)     | NOT NULL, UNIQUE                                           |
| type             | ENUM('category', 'tag', 'location') | NOT NULL                                |

## article_filters
| Column Name      | Data Type        | Constraints                                                       |
|------------------|------------------|-------------------------------------------------------------------|
| article_id       | INT              | NOT NULL, FOREIGN KEY (article_id) REFERENCES articles(id)        |
| filter_id        | INT              | NOT NULL, FOREIGN KEY (filter_id) REFERENCES search_filters(id)   |
| PRIMARY KEY      | (article_id, filter_id) |                                                            |

## research_diagrams
| Column Name      | Data Type        | Constraints                                                 |
|------------------|------------------|-------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                 |
| title            | VARCHAR(255)     | NOT NULL                                                    |
| description      | TEXT             |                                                             |
| diagram_url      | VARCHAR(255)     | NOT NULL                                                    |
| created_by       | INT              | NOT NULL, FOREIGN KEY (created_by) REFERENCES users(id)     |
| created_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                   |
| updated_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                   |

## ai_reporters
| Column Name      | Data Type        | Constraints                                                |
|------------------|------------------|------------------------------------------------------------|
| id               | INT              | PRIMARY KEY, AUTO_INCREMENT                                |
| article_id       | INT              | NOT NULL, FOREIGN KEY (article_id) REFERENCES articles(id) |
| summary          | TEXT             | NOT NULL                                                   |
| created_at       | TIMESTAMP        | DEFAULT CURRENT_TIMESTAMP                                  |

### Relationships
- `articles.author_id` references `users.id`
- `article_filters.article_id` references `articles.id`
- `article_filters.filter_id` references `search_filters.id`
- `research_diagrams.created_by` references `users.id`
- `ai_reporters.article_id` references `articles.id`
---


# DB & Relationships

```json

Table users {
    id INT [primary key, increment]
    first_name VARCHAR(100) [not null]
    last_name VARCHAR(100) [not null]
    email VARCHAR(255) [not null, unique]
    password_hash VARCHAR(255) [not null]
    role ENUM('editor', 'admin') [not null]
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table articles {
    id INT [primary key, increment]
    title VARCHAR(255) [not null]
    display_type VARCHAR(50) [not null]
    content TEXT [not null]
    image_filename VARCHAR(255)
    youtube_embed_url VARCHAR(255)
    location VARCHAR(255) [not null]
    contributors TEXT
    author_id INT [not null]
    section VARCHAR(50) [not null]
    tags TEXT [not null, default: '[]']
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    version_history TEXT [default: '[]']
}

Table subscriptions {
    id INT [primary key, increment]
    first_name VARCHAR(100) [not null]
    last_name VARCHAR(100) [not null]
    email VARCHAR(255) [not null, unique]
    frequency ENUM('Daily', 'Weekly', 'Monthly') [not null]
    sections TEXT [default: '[]']
    tags TEXT [default: '[]']
    subscribed_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table search_filters {
    id INT [primary key, increment]
    name VARCHAR(255) [not null, unique]
    type ENUM('category', 'tag', 'location') [not null]
}

Table article_filters {
    article_id INT [not null]
    filter_id INT [not null]
    primary key (article_id, filter_id)
}

Table research_diagrams {
    id INT [primary key, increment]
    title VARCHAR(255) [not null]
    description TEXT
    diagram_url VARCHAR(255) [not null]
    created_by INT [not null]
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table ai_reporters {
    id INT [primary key, increment]
    article_id INT [not null]
    summary TEXT [not null]
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Ref: articles.author_id > users.id
Ref: article_filters.article_id > articles.id
Ref: article_filters.filter_id > search_filters.id
Ref: research_diagrams.created_by > users.id
Ref: ai_reporters.article_id > articles.id
```