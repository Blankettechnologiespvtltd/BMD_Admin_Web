
import { useLocation } from "react-router-dom";

function OrderFullDetails() {
  const location = useLocation();
  const { order } = location.state || {};

  console.log(order);

  return (
    <div>
      <h2>Order Details</h2>

      <p>Order ID: {order?.Id}</p>
      <p>Customer: {order?.customer_name}</p>
      <p>Status: {order?.status}</p>
      <p>Amount: {order?.amount}</p>

   
    </div>
  );
}

export default OrderFullDetails;