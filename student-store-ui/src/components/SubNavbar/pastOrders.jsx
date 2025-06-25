import "./SubNavbar.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function pastOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    return (
        <div className="past-orders">
            <h3>Past Orders</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <Link to={`/order/${order.id}`}>
                            <h4>{order.customer}</h4>
                            <p>{order.totalPrice}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );  

    
}

export default pastOrders;