import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizza = pizzaData;
  const lengthPizza = pizza.length > 0;
  console.log(lengthPizza);
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {lengthPizza ? (
        <>
          <p>
            Authentic Italian Cuisine. 6 creative dishesto choose from All from
            our stone oven all organic, all delicious{" "}
          </p>
          <ul className="pizzas">
            {pizza.map((data) => (
              <Pizza pizza={data} key={data.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>Pizza is not available🍕</p>
      )}
    </main>
  );
}
function Pizza({ pizza }) {
  return (
    <li className={`pizza ${pizza.soldOut ? "pizza.sold-out" : ""}`}>
      <img
        className={`${pizza.soldOut ? "sold_out_img" : ""}`}
        src={pizza.photoName}
        alt={pizza.name}
      />
      <div>
        <h3>{pizza.namr}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "SOLD OUT" : Pizza.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 11;
  const closeHour = 22;
  const isOpen = hour > openHour && hour < closeHour;
  console.log(isOpen);
  return (
    <footer className="footer">
      {isOpen ? (
        <Order close={closeHour} />
      ) : (
        <div className="order">
          <p>
            Our restaurant is closed and will open tomorrow morning at.
            {openHour}
            :00
          </p>
          <button className="btn">order</button>
        </div>
      )}
    </footer>
  );
}
function Order({ close }) {
  return (
    <div className="order">
      <p>Our restaurant is open until {close}:00.</p>
      <button className="btn">order</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
