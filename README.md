# 3rd Feet

[Visit our 2nd-hand Shop!](https://poetic-conkies-880cc5.netlify.app/)

## Description
**Your Ultimate Online Destination for Second-Hand Discoveries!**

Step into a world of unparalleled value and sustainability with 3rd Feet, your go-to online marketplace for second-hand wonders. Our platform offers a thoughtfully curated assortment of pre-owned items, spanning a wide spectrum of categories including electronics, bikes, books, art, home goods, and so much more, all at exceptional prices.
3rd Feet isn't just about acquiring goods – it's about embracing a lifestyle that prioritizes sustainability. Each purchase contributes to minimizing waste and giving quality items a new lease on life. With our intuitive interface, your online thrift shopping experience is streamlined..


## MVP
**User Registration and Authentication:**
- User accounts with basic profile information
- Secure authentication and login process

**Product Listings:**
- Ability for users to list their second-hand items for sale
- Product details including title, description, price, category, condition, and images
- Search and filtering options to help users find items easily

**Product Display:**
- Clear and appealing product pages with images and descriptions
- Mobile-friendly and responsive design for optimal user experience across devices

**User dashboard to manage listings, purchases, and sales.**
- Wishlist 
- Sold and bought items 

**Search and Filters:**
- Robust search functionality with keyword search

## Backlog
**Notifications:**
- Email notifications for order confirmation, shipping updates, and account-related activities.
- In-App Messaging 

**Shopping Cart:**
- Add items to a cart for a seamless shopping experience.
- Quantity adjustments and item removal from the cart

**Checkout and Payment:**
- Secure checkout process with payment integration (e.g., credit cards, PayPal)

**Secure Payment Handling:**
- Implementation of secure payment gateways to protect sensitive information

**Rating and Reviews:**
- Ability for buyers to rate and leave reviews for products and sellers
- Overall seller rating visible on product pages

**Search and Filters:**
- Advanced filters based on price range, condition, location, etc

**Admin Dashboard:**
- Backend system for administrators to manage user accounts, listings, and reported content

## Technologies used
- **Front-end**:
  - React: A JavaScript program library for creating web-based user interfaces
  - HTML5: Markup language for structuring the user interface
  - CSS3: Stylesheets for styling the application's layout and design
  - JavaScript: Programming language for adding interactivity and functionality to the front-end
  - NextUi: A popular CSS framework that provides responsive design components and utilities for creating a mobile-friendly user interface

- **Back-end:**
  - Node.js: A server-side JavaScript runtime used to run the application on the server
  - Express.js: A web application framework for Node.js that simplifies the creation of server-side applications and APIs
  - MongoDB: A NoSQL database used for storing user information, car details, and reservations
  - Mongoose: An ODM (Object Data Modeling) library for MongoDB, simplifying database interaction and schema management
  - JWT (JSON Web Tokens): For secure user authentication and authorization
  - Cloudinary: A cloud-based service for managing and optimizing images and videos.
  - Multer: Middleware for handling file uploads in Node.js applications.
  - Axios: A promise-based HTTP client for making API requests from the server.


- **Server Hosting and Deployment:**
  - Adaptable: A cloud platform used for deploying and hosting the application online
  - Netlify: A cloud platform used for deploying and hosting the application online

- **Security:**
  - Bcrypt.js: For hashing and salting passwords before storing them in the database
  - CORS (Cross-Origin Resource Sharing): To control which origins are allowed to access resources on the server

- **Version Control:**
  - Git: A version control system for tracking changes in code and collaborating with others.
  - GitHub: A web-based hosting service for version control and project management.

- **Other Dependencies:**
  - npm: The Node.js package manager used for installing and managing project dependencies.

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | HomePage                       | public `<Route>`            | Home page, display all products, search-bar                   |
| `/signup`                 | SignupPage                     | public `<Route>`            | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | public `<Route>`            | Login form, link to signup, navigate to homepage after login  |
| `/product`                | ProductDetailPage              | public `<Route>`            | Display product details, add to favorites, buy                |
| `/profile`                | ProfilePage, Logout, Delete    | user only `<PrivateRoute>`  | Display profile data, logout button, delete account button    |
| `/editProfile`            | UpdateUserPage, UserEditForm   | user only `<PrivateRoute>`  | Display profile data, change data or password                 |
| `/purchases`              | PurchaseDetailPage             | user only `<PrivateRoute>`  | Shows all purchases: Sold items, bought items                 |
| `/favorites`              | FavouritesPage, Favorite       | user only  `<PrivateRoute>` | Display all prducts marked favorite by the user               |
| `/upload`                 | UploadPage                     | user only `<PrivateRoute>`  | Add new product with description and picture                  |
| `*`                       | Error Page                     | public  `<Route>`           | Error Page with return-home button                            |


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/verify    `           | JWT Token               | 200            |           | Verify user           |
| POST        | `/auth/signup`                | {fullname, username, email, phone, address password}      | 201            | 500          | Create user with encrypted password |
| POST        | `/auth/login`                 | {email, password}         | 202            | 403          | Checks if user exists and if password matches, then sign jwt    |
| GET        | `/users`                | (empty)                      |             |           | Fetch all user data                                           |
| GET        | `/users/:userid`                 | userid  |                |           | Fetch particular user data                                               |
| PUT         | `/users/:userid`             |       userid                       |                | 400          | Show series elements                                           |
| GET         | `/backlog/films`              |                              |                |              | Show film elements                                           |
| GET         | `/backlog/games`              |                              |                |              | Show games elements                                          |
| GET         | `/media/:id`                        |                              | 201            | 400          | Show specific element                                        |
| PUT         | `/media/:id`                 |                              | 200            | 400          | edit element                                                 |
| DELETE      | `/media/:id`                 |                              | 201            | 400          | delete element                                               |
| GET         | `/done/series`                |                              |                | 400          | Show series elements                                         |
| GET         | `/done/films`                 |                              |                |              | Show film elements                                           |
| GET         | `/done/games`                 |                              |                |              | Show games elements                                          |




## Links

- [Trello Link](https://trello.com)
- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)