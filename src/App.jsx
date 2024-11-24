import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitars from "./components/Guitars";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const maxItems = 5;

  function addCart(guitars) {
    const elementExist = cart.findIndex((items) => guitars.id === items.id);
    if (elementExist < 0) {
      guitars.quantity = +1;
      setCart([...cart, guitars]);
    } else {
      if (cart[elementExist].quantity < maxItems) {
        const copyCart = [...cart];
        copyCart[elementExist].quantity++;
        setCart([...copyCart]);
      }
    }
  }

  function removeCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const increased = cart.map((items) => {
      if (id === items.id && items.quantity < maxItems) {
        return {
          ...items,
          quantity: items.quantity + 1,
        };
      }
      return items;
    });

    setCart(increased);
  }

  function cleanCart() {
    setCart([]);
  }

  function decreaseQuantity(id) {
    const decreased = cart.map((items) => {
      if (id === items.id && items.quantity > 1) {
        return {
          ...items,
          quantity: items.quantity - 1,
        };
      }
      return items;
    });

    setCart(decreased);
  }

  return (
    <>
      <Header
        cart={cart}
        removeCart={removeCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitars guitar={guitar} key={guitar.id} addCart={addCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
