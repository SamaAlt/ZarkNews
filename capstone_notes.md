## Baseline Feature Requirements:

- All implemented features are Bug Free
- All implemented features are Fully Styled
- All implemented features Have Proper Error Handling
- All implemented features are Dead Link Free

## User Auth Requirements:

- Bug Free
- Deadlink Free
- Signup Functionality Completed
- Login Functionality Completed
- Demo User Functionality Completed
- Logout Functionality Completed
- Error Handlings Functionality Completed



## Project progression 

* Planning & Design

    1. Database schema  
    2. Wireframe  
    3. User stories  
    4. Features list (CRUDs)  
---

* Backend Development

    1. API Documentation 
    2. Edit signup forms and auth routes to existing/new files under `app/api`  
    3. Create models referencing the database schema  
    4. Confirm relationships in each model are set up correctly  
    5. Run migrations  
    6. Setup seeders  
    7. Seed  
    8. Create API routes referencing API documentation  
    9. Test routes  
    10. Deploy backend to Render using Docker  

---
* Frontend Development

    1. Redux-state  
    2. Redux store (add `store.js` and other files like `reviews.js`, `session.js`, etc.)  
    3. Define actions, thunks, and reducers  
    4. User-facing routes (frontend routes)  
    5. React Components  
    6. CSS styling  
    7. Deploy full app to to Render using Docker  


## Summary of Naming Conventions
| Entity                  | Convention               | Example                         |
|-------------------------|--------------------------|---------------------------------|
| React Component Files   | PascalCase               | Navbar.js, UserProfile.js       |
| React Component Names   | PascalCase               | function Navbar() {}            |
| Utility Files           | camelCase                | formatDate.js                   |
| Custom Hooks            | camelCase (use prefix)   | useFetchData.j                  |
| CSS Classes             | kebab-case               | .user-profile-container         |
| IDs                     | kebab-case               | #user-profile-section           |
| JSON Keys               | camelCase                | { "userId": 123 }               |
| Environment Variables   | UPPER_SNAKE_CASE         | REACT_APP_API_URL               |
| Test Files              | camelCase                | Navbar.test.js                  |
| Index Files             | lowercase                | index.js                        |


## Migration and Models
1. create model files
(1b. if there's no migrations folder yet, run 'flask db init')
2. flask db migrate -m 'migration name'
3. add environment conditional in the migration file 
4. flask db upgrade
5. create seed files
6. flask seed all