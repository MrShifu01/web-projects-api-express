# Web Project API

This is a RESTful API built with Express that allows users to manage a list of web project items.

## Getting Started

To test the API, you can use Postman, a popular API testing tool. Follow the steps below to get started.

### Prerequisites

Before testing the API, make sure you have the following installed:

- [Node.js](https://nodejs.org) (version 12 or above)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies by running the following command in the project folder:

   ```bash
   npm install
   ```

### Testing the API with Postman

1. Launch Postman.

2. Start the server by running the following command in the project folder:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:8080`.

3. Use Postman to make HTTP requests to interact with the API. The available endpoints are:

   - `GET /api`: Retrieve all web project items.
   - `POST /api`: Add a new web project item. Requires parameters `id`, `title`, `description`, and `URL`.
   - `DELETE /api`: Delete a web project item by `id`. Requires parameter `id`.
   - `PUT /api`: Update the `title` or `description` of a web project item by `id`. Requires parameters `id`, `title`, and/or `description`.

   Make sure to set the appropriate request method, URL, and provide the required parameters for each request.

4. Send the request and observe the response from the API.

### Example Request and Response

Here's an example of how you can use Postman to interact with the API:

- **GET /api**

  - URL: `http://localhost:8080/api`
  - Method: GET

  This request will retrieve an array of all web project items.

- **POST /api**

  - URL: `http://localhost:8080/api`
  - Method: POST
  - Parameters: `id`, `title`, `description`, `URL`

  This request will add a new web project item to the list.

- **DELETE /api**

  - URL: `http://localhost:8080/api`
  - Method: DELETE
  - Parameters: `id`

  This request will delete a web project item with the specified `id`.

- **PUT /api**

  - URL: `http://localhost:8080/api`
  - Method: PUT
  - Parameters: `id`, `title`, `description`

  This request will update the `title` and/or `description` of a web project item with the specified `id`.

Please note that you need to provide the necessary parameters in the request body or as query parameters depending on the request type.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and contributions are highly appreciated!

## License

This project is licensed under the [MIT License](./LICENSE).

---