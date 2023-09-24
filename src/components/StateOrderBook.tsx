import { memo, useCallback, useEffect, useState } from "react";
import { OrderBook } from "./OrderBook";
import { Asks, Bids } from "../types";
import { fetchOrderBook } from "../utils/api";

type Props = {
  symbol: string
  interval: number
}

export const StateOrderBook = memo(({ symbol, interval }: Props) => {
  const [bids, setBids] = useState<Bids>([]);
  const [asks, setAsks] = useState<Asks>([]);

  const fetchData = useCallback(async () => {
    const data = await fetchOrderBook(symbol)
    if (!data) {
      return;
    }

    setBids(data.bids);
    setAsks(data.asks);
  }, [symbol]);

  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [fetchData, interval]);

  return (
    <OrderBook bids={bids} asks={asks} />
  );
});
