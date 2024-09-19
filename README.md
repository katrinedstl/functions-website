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

To watch for changes while developing, you can run

```sh
npm run watch
```

### 🏃‍♀️ Run

```sh
npm run start
```

## 🧱 Code structure

In the `functions` folder you can find all the functions this app can run.

### 📃 Pages

The primary role of this app is to render HTML pages in response to user requests. Inside the `functions` folder, you’ll find examples of functions that perform this, such as `functions/root`.

`*.server.ts` handles page building when a request reaches the server.
`*.page.tsx` defines the page component that will be rendered.
`*.scss` provides the styles for the page, following the BEM naming convention.

### 🗄️ Server

The `server` folder contains utils essential for the server. It includes logic to render React components as HTML on the server and settings required to run Azure Functions. These configurations are copied during the build process and should not be moved.
