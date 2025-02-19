
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

## Migration and Models
1. create model files
(1b. if there's no migrations folder yet, run 'flask db init')
2. flask db migrate -m 'migration name'
3. add environment conditional in the migration file 
4. flask db upgrade
5. create seed files
6. flask seed all

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
