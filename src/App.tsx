import { PromiseOrderBook } from "./components/PromiseOrderBook";
import { StateOrderBook } from "./components/StateOrderBook";

const SYMBOL = 'BTCUSDT';
const INTERVAL = 500;

const App = () => {
  return (
    <div className="p-12 flex items-start justify-center gap-4">

      <div className="w-full" style={{ maxWidth: '540px'}}>
        <h1 className="text-4xl font-bold text-center bg-slate-100 text-slate-800 px-4 p-2 rounded w-full mb-2">{SYMBOL}</h1>
        <StateOrderBook symbol={SYMBOL} interval={INTERVAL} />
      </div>

      <div className="w-full" style={{ maxWidth: '540px'}}>
        <h1 className="text-4xl font-bold text-center bg-slate-100 text-slate-800 px-4 p-2 rounded w-full mb-2">{SYMBOL}</h1>
        <PromiseOrderBook symbol={SYMBOL} interval={INTERVAL} />
      </div>

    </div>
  );
}

export default App;
