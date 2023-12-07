import React, { useEffect, useState } from "react";
import "./Customer.css";
import Sidebar from "./sidebar/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function Customer() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const cusRef = collection(db, "users");
        const querySnapshot = await getDocs(cusRef);
        const cusData = [];

        querySnapshot.forEach((doc) => {
          cusData.push({ id: doc.id, ...doc.data() });
        });
        setCustomer(cusData);
      } catch (error) {
        alert("Loading.......");
        console.log("user error:", error);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <div className="customer">
      <div className="customer-left">
        <Sidebar />
      </div>
      <div className="customer-right">
        <div className="customer-title">
          <h2>Registered Customers</h2>
        </div>
        <div className="customer-body">
          <div className="customer-table">
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Email</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {customer.map((user) => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
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

export default Customer;
