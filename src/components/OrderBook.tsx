import { memo } from "react"
import { Asks, Bids } from "../types"

type Props = {
  bids: Bids
  asks: Asks
}

export const OrderBook = memo(({ bids, asks }: Props) => (
  <div className="flex flex-row justify-between w-full">
    <div className="w-1/2 pr-1">
      <table className="w-full bg-red-50 rounded overflow-hidden">
        <thead className="text-red-900">
          <tr>
            <th className="text-right px-4 py-2 w-1/2">Size</th>
            <th className="text-right px-4 py-2 w-1/2">Price</th>
          </tr>
        </thead>
        <tbody>
          {bids.slice(0, 10).map((bid: [string, string], index: number) => (
            <tr key={`bid-${index}`} className="text-red-700 font-medium">
              <td className="text-right tabular-nums px-4 py-1">{bid[1]}</td>
              <td className="text-right tabular-nums px-4 py-1">{(parseFloat(bid[0])).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="w-1/2 pl-1">
      <table className="w-full bg-green-50 rounded overflow-hidden">
        <thead className="text-green-900">
          <tr>
            <th className="text-left px-4 py-2 w-1/2">Price</th>
            <th className="text-left px-4 py-2 w-1/2">Size</th>
          </tr>
        </thead>
        <tbody>
          {asks.slice(0, 10).map((ask: [string, string], index: number) => (
            <tr key={`ask-${index}`} className="text-green-700 font-medium">
            <td className="text-left tabular-nums px-4 py-1">{(parseFloat(ask[0])).toFixed(2)}</td>
              <td className="text-left tabular-nums px-4 py-1">{ask[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));
