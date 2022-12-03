import { useCart } from "react-use-cart";
import Navigation from "./navigation";
import Items from "./items";

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  if (isEmpty) return <Navigation />;
  return (
    <div>
      <Navigation />
      <h1 className="cart"> Shopping Cart </h1>
      <div className="cartinfo">
        <button onClick={emptyCart}> Empty Cart </button>
        <div className="itemsquantity">
          <h2 className="totalitems"> Total Items : {totalItems} </h2>
        </div>
        <h2> Total : {cartTotal}€ </h2>
      </div>
      <Items />
      <button className="checkout"> Checkout </button>
    </div>
  );
};

export default Cart;
