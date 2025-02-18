# Database Schema

# Layout
![alt text](image.png)


## Users Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| username        | varchar   | NOT NULL                        |
| email           | varchar   | NOT NULL                        |
| password_hash   | varchar   | NOT NULL                        |
| role            | varchar   | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |
| updated_at      | timestamp | NOT NULL                        |


## Articles Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| title           | varchar   | NOT NULL                        |
| content         | text      | NOT NULL                        |
| author_id       | int       | FOREIGN KEY (users.id)          |
| status          | varchar   | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |
| updated_at      | timestamp | NOT NULL                        |
| published_at    | timestamp | NULL                            |
| version         | int       | NOT NULL                        |
| approved_by     | int       | FOREIGN KEY (users.id)          |
| approval_status | varchar   | NOT NULL                        |


## Article Media Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| article_id      | int       | FOREIGN KEY (articles.id)       |
| media_type      | varchar   | NOT NULL                        |
| media_url       | varchar   | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |


## Search Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| article_id      | int       | FOREIGN KEY (articles.id)       |
| keywords        | text      | NOT NULL                        |
| tags            | text      | NOT NULL                        |
| search_count    | int       | NOT NULL                        |
| last_searched_at| timestamp | NOT NULL                        |


## Filters Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| filter_name     | varchar   | NOT NULL                        |
| filter_type     | varchar   | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |
| updated_at      | timestamp | NOT NULL                        |


## Article Filters Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| article_id      | int       | FOREIGN KEY (articles.id)       |
| filter_id       | int       | FOREIGN KEY (filters.id)        |


## Subscription Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| user_id         | int       | FOREIGN KEY (users.id)          |
| newsletter_name | varchar   | NOT NULL                        |
| subscribed_at   | timestamp | NOT NULL                        |
| unsubscribed_at | timestamp | NULL                            |


## Analytics Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| editor_id       | int       | FOREIGN KEY (users.id)          |
| diagram_name    | varchar   | NOT NULL                        |
| diagram_data    | json      | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |
| updated_at      | timestamp | NOT NULL                        |


## AI Reporter Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| summary_text    | text      | NOT NULL                        |
| generated_by    | varchar   | NOT NULL                        |
| generated_at    | timestamp | NOT NULL                        |
| updated_at      | timestamp | NOT NULL                        |
| feedback        | text      | NULL                            |


## Article Collaborators Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| article_id      | int       | FOREIGN KEY (articles.id)       |
| editor_id       | int       | FOREIGN KEY (users.id)          |
| created_at      | timestamp | NOT NULL                        |


## Search Analytics Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| search_term     | varchar   | NOT NULL                        |
| search_count    | int       | NOT NULL                        |
| last_searched_at| timestamp | NOT NULL                        |


## User Interests Table

| Column          | Type      | Constraints                     |
|-----------------|-----------|---------------------------------|
| id              | int       | PRIMARY KEY, AUTO_INCREMENT     |
| user_id         | int       | FOREIGN KEY (users.id)          |
| interest_keyword| varchar   | NOT NULL                        |
| created_at      | timestamp | NOT NULL                        |


## Foreign Key References
```
Ref: articles.author_id > users.id // Articles authored by users
Ref: articles.approved_by > users.id // Articles approved by users
Ref: article_media.article_id > articles.id // Media linked to articles
Ref: search.article_id > articles.id // Search linked to articles
Ref: article_filters.article_id > articles.id // Filters applied to articles
Ref: article_filters.filter_id > filters.id // Filters linked to articles
Ref: subscription.user_id > users.id // Subscriptions linked to users
Ref: analytics.editor_id > users.id // Analytics created by editors
Ref: article_collaborators.article_id > articles.id // Collaborators linked to articles
Ref: article_collaborators.editor_id > users.id // Collaborators linked to users
Ref: user_interests.user_id > users.id // Interests linked to users
```