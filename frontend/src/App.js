import React from "react";
import { Container } from "react-bootstrap";
import { HashRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartScreen from "./pages/CartScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersListPage from "./pages/UsersListPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrdersPage from "./pages/OrdersPage";
import UserEditPage from "./pages/UserEditPage";
import RoughPage from "./pages/RoughPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";


function App() {
  return (
    <HashRouter>
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          
          
            <Routes>
              <Route path="/" element={<HomePage />} exact/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrdersPage />} />

              <Route path="/admin/userlist" element={<UsersListPage />}/>
              <Route path="/admin/user/:id/edit" element={<UserEditPage />}/>

              <Route path="/admin/productlist" element={<ProductListPage />}/>
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />}/>

              <Route path="/admin/orderlist" element={<OrderListPage />}/>

              <Route path="/rough" element={<RoughPage />} />
            </Routes>
         
        </Container>
      </main>
      <Footer />
    </React.Fragment>
    </HashRouter>
  );
}

export default App;
