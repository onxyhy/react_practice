import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const handleMoneyChange = (event) => {
    setMoney(event.target.value);
  };
  const handleCoinChange = (event) => {
    const selected = coins.find((coin) => coin.id === event.target.value);
    setSelectedCoin(selected);
  };

  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      <input
        type="number"
        placeholder="My money : "
        value={money}
        onChange={handleMoneyChange}
      />
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={handleCoinChange}>
            <option value ="">Select a coin</option>
            {coins.map((coin, index) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}({coin.symbol}):${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          {selectedCoin && money && (
            <p>
              With ${money}, you can buy{" "}
              <strong>
                {(money / selectedCoin.quotes.USD.price).toFixed(6)}
              </strong>{" "}
              {selectedCoin.symbol}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
