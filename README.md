<h1 align="center">APB-Trader-React </h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Trading site made for APB Reloaded the game where users can trade in-game weapons. This project was built using react, react-router, and a firebase backend.

<a href="https://apb-trader.netlify.com/">Demo App</a>

## Install

```sh
npm install
```
### Firebase Dependency
```sh
- Changes to file "TradeView.js"
1. Replace "var firebaseConfig = { }" with your firebaseConfig for authorization.
2. Replace "const FIREBASE_TRADE_URL" with your firebase realtime database URL. ("https://EXAMPLE.firebaseio.com/trades.json")
3. Replace "const FIREBASE_TRADE_URL_DELETE" with your firebase realtime database URL. ("https://EXAMPLE.firebaseio.com/trades/")

- Changes to file "TradeViewModal.js"
- 1. Replace "const FIREBASE_TRADE_URL" with your firebase URL. ("https://EXAMPLE.firebaseio.com/trades.json")
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Gilberto Gaspar**

* Github: [@GilbertoGaspar](https://github.com/GilbertoGaspar)

