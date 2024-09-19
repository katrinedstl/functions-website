# ⚡️ Website running on Azure Functions

This is a simple website renderer running on Azure Functions. This is created for test purposes and should probably not be used in production.

## ⚛️ Client

The client is mostly [React](https://reactjs.org/) components.

## 🖥️ Server

The server is implemented on [Node.js](https://nodejs.org/) running on [Azure Functions](https://azure.microsoft.com/en-us/services/functions/).

## How to run the website

### ⚙️ Settings

Create a local settings file:

```bash
touch server/local.settings.json
```

See [`example.local.settings.json`](./example.local.settings.json) for an example.

### ⬇️ Get Dependencies

```sh
npm ci
```

### 👷‍♀️ Build

```sh
npm run clean
npm run build:dev
```

The result of the builds are written to `./dist`.

## 🏃‍♀️ Run

```sh
npm run build
npm run start
```
