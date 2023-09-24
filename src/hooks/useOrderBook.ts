import { useEffect, useState } from "react";

type OrderBook = {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
};

export const useOrderBook = (symbol: string) => {
  const [{ bids, asks }, setOrderBook] = useState<OrderBook>({
    lastUpdateId: 0,
    bids: [],
    asks: [],
  });

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setOrderBook({ asks: data.a, bids: data.b, lastUpdateId: data.u });
    }

    return () => {
      ws.close()
    }
  }, [symbol]);

  return { bids, asks };
}
