# Key-Value pair using swagger-express-middleware with MongoDB

    This is an API application that stores a key-value pair and retrieves the latest value stored in the system

### Installation
Pre-requisites (install with -g option)
- [Node](https://nodejs.org) >= 8.4.0
- [NPM](https://www.npmjs.com/)
- [SWAGGER](https://www.npmjs.com/package/swagger) = 2.0
- [apiDoc][http://apidocjs.com/]
#### Application setup
```sh
$ git clone https://github.com/dennisjade/key-value.git
$ cd key-value
$ npm install
$ npm start
```
### Running tests
```sh
$ npm test
```
### Viewing test coverage
- In the root directory, run the command below
- To view the HTML version report, go to **coverage/lcov-report/index.html**
```sh
$ ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha  test/**/*
```

### Creating the API doc
```sh
$ apidoc -i api -o doc/
```

### Swagger UI (To test the APIs using browser)
```sh
$ swagger project edit
```

### Available APIs
|Method | Route | Params | Description |
|-------|-------|--------|-------------|
|GET    | /object/key | NONE |Retrieves latest value stored based on the key|
|GET   | /object/key | timestamp <number> |Retrieves latest value stored based on key and within timestamp|
|POST | /object | key;value |Add key-value pair in DB. Pass inside the `body`|

### Sample API calls
```sh
$ curl -X 'GET' http://localhost:10010/object/1

$ curl -X 'GET' http://localhost:10010/object/1?timestamp=1505231250937

$ curl -H "Content-Type: application/json" -X POST -d '{"key":"4","value":"Test 4"}' http://localhost:10010/object
````
