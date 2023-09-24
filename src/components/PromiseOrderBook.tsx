import { Suspense, memo, useEffect, useState } from "react";
import { api } from "../utils/api";
import { OrderBook } from "./OrderBook";

type PropsInner = {
  symbol: string
}

const PromiseOrderBookInner = ({ symbol }: PropsInner) => {
  const { bids, asks } = api.getOrderBook(symbol);

  return (
    <OrderBook bids={bids} asks={asks} />
  );
}

type Props = {
  symbol: string
  interval: number
}

export const PromiseOrderBook = memo(({ symbol, interval }: Props) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(tick => tick + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    if (tick === 0) return;

    console.log(`Updating this component every ${interval/1000} seconds & fetching new data`, { tick })

    api.fetchOrderBook(symbol)
  }, [tick, symbol, interval])

  return (
    <Suspense>
      <PromiseOrderBookInner symbol={symbol} />
    </Suspense>
  );
});
