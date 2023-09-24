export type Bid = [string, string];
export type Ask = [string, string];
export type Bids = Bid[];
export type Asks = Ask[];

export type OrderBook = {
  lastUpdateId: number;
  bids: Bids;
  asks: Asks;
};
