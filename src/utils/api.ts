import { OrderBook } from "../types";

let status = "pending";
let promise: Promise<OrderBook | null> | null = null;
let result: OrderBook = {
  lastUpdateId: 0,
  bids: [],
  asks: [],
};

export const fetchOrderBook = async (symbol: string) => {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/depth?limit=10&symbol=${symbol}`);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data) {
      return null;
    }

    return data as OrderBook;
  } catch {
    return null;
  }
}

const _fetchOrderBook = async (symbol: string) => {
  status = "pending";

  promise = fetchOrderBook(symbol);

  promise.then((data) => {
    if (data) {
      status = "success";
      result = data;
    } else {
      status = "error";
    }
  }).catch(() => {
    status = "error";
  }).finally(() => {
    promise = null;
  });
}

export const api = {
  getOrderBook(symbol: string) {
    if (!result.lastUpdateId) {
      _fetchOrderBook(symbol);
    }

    if (status === "pending") {
      throw promise;
    }

    if (status === "error") {
      throw result;
    }

    return result;
  },
  fetchOrderBook: _fetchOrderBook,
}
