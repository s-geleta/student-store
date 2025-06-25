import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import {
  removeFromCart,
  addToCart,
  getQuantityOfItemInCart,
  getTotalItemsInCart,
} from "../../utils/cart";
import "./App.css";
import { calculateTotal } from "../../utils/calculations";
import { calculateTaxesAndFees } from "../../utils/calculations";
import { calculateItemSubtotal } from "../../utils/calculations";

function App() {
  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  //fetching products from database
  useEffect(() => {
    setIsFetching(true);
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, []);
  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);

    //creating the array of order items
    const items = Object.keys(cart).map((productId) => {
      const product = products.find((p) => p.id === Number(productId));
      //returns an object with the productId, quantity, and price of the order item
      return {
        productId: Number(productId), 
        quantity: Number(cart[productId]),
        price: Number(product?.price),
      };
    });
    //getting the user's name and dorm number from the userInfo object
    const { name, dormNumber } = userInfo;
    //calculating order totals
    const subTotal = items.reduce((acc, item) => acc + calculateItemSubtotal(item.price, item.quantity), 0);
    const taxesAndFees = calculateTaxesAndFees(subTotal);
    const totalWithTaxesAndFees = calculateTotal(subTotal);
    //creating the order object
    const order = {
      customer: Number(name),
      dormNumber: Number(dormNumber),
      totalPrice: Number(totalWithTaxesAndFees.toFixed(2)),
      status: "pending",
      orderItems: items
    };
    //making a post request to the orders endpoint with the order object
    try {
      console.log(order);
      const response = await axios.post("http://localhost:3000/orders", order);
      setOrder(response.data);
      setIsCheckingOut(false);
      setUserInfo({ name: "", dormNumber: "" });
    } catch (error) {
      console.error({
        message: error.message, 
        code: error.code,
        meta: error.meta,
      });

      setError("Checkout failed. Please try again.");
      setIsCheckingOut(false);
    }

  };

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <pastOrders />
        <main>
          <Header />
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
