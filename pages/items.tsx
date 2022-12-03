import { useCart } from 'react-use-cart'

export default function Items() {
    const { items, updateItemQuantity, removeItem } = useCart();
    return (
        <div>
            {items.map((item, index) => {
                return (
                    <div className="allitems" key={index}>
                        <img src={item.image} />
                        <div className="iteminfo">
                            <h2> {item.name} </h2>
                            <h3> {item.price}.00€ </h3>
                        </div>
                        <div className='quantity'>
                            <h4> Quantity : {item.quantity} </h4>
                            <div className="editquantity">
                                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}> - </button>
                                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}> + </button>
                                <button onClick={() => removeItem(item.id)}> x </button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}