
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PriceHistory({ productId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/price-history/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading price history:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading price history...</p>;
  }

  if (history.length === 0) {
    return <p>No price history available.</p>;
  }
  const firstPrice = history[0].price;
const latestPrice = history[history.length - 1].price;

const priceDrop = firstPrice - latestPrice;
const hasPriceDropped = priceDrop > 0;
  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <h3>Price History</h3>
        {hasPriceDropped ? (
  <p className="price-drop-message">
    🎉 Price dropped by ₹{priceDrop.toLocaleString("en-IN")}!
  </p>
) : (
  <p className="price-drop-message">
    No price drop recorded yet.
  </p>
)}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recorded_date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6b8f71"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceHistory;
