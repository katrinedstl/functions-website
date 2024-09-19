# ⚡️ Website running on Azure Functions

This is a simple website running on Azure Functions. This is created for test purposes and should probably not be used in production.

## ⚛️ Client

The client is mostly [React](https://reactjs.org/) components.

## 🖥️ Server

The server is implemented on [Node.js](https://nodejs.org/) running on [Azure Functions](https://azure.microsoft.com/en-us/services/functions/).

## How to run the website

### ⬇️ Get Dependencies

```sh
npm ci
```

### 👷‍♀️ Build

```sh
npm run build
```

The builds are done using [esbuild](https://esbuild.github.io/). The result of the builds are written to `./dist`.

## 🏃‍♀️ Run

```sh
npm run start
```

## 👩‍💻 Development

To watch for changes while developing, you can run

```sh
npm run build:dev
```

Note that you still have to run your function app using the run-command (`npm run start`)
