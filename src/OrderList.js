import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import "./OrderList.css";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = collection(db, "orders");
        const querySnapshot = await getDocs(orderRef);
        const orderData = [];

        for (const doc of querySnapshot.docs) {
          const order = doc.data();
          const orderID = doc.id; // Get the orderID from the document
          const orderItemRef = collection(db, "orderItem");
          const q = query(orderItemRef, where("orderID", "==", orderID));
          const orderQuerySnapshot = await getDocs(q);
          const orderProducts = [];

          orderQuerySnapshot.forEach((doc) => {
            orderProducts.push({ id: doc.id, ...doc.data() });
          });

          orderData.push({ id: orderID, ...order, orderProducts });
        }

        setOrders(orderData);
      } catch (error) {
        console.log('order error:', error);
      }
    };

    fetchOrder();
  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Adjust the formatting to your needs
  }

  return (
    <div className="order-list">
      <div className="order-list-left">
        <Sidebar />
      </div>
      <div className="order-list-right">
        <div className="order-list-title-container">
          <h2>Order List</h2>
        </div>
        <div className="order-list-body">
          <div className="order-list-table">
            <table>
             <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>Customer Phone number</th>
                  <th>Oder detail</th>
                  <th>Total Price</th>
                  <th>Oder Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.firstName} {order.lastName}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>
                      {order.orderProducts.map((orderProduct) => (
                        <dl key={orderProduct.id}>
                          <dd>{orderProduct.productName}</dd>
                          <dd>Qty: {orderProduct.quantity}</dd>
                        </dl>
                      ))}
                    </td>
                    <td>{order.total}</td>
                    <td>{formatTimestamp(order.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;

