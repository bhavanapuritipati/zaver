import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import './CartPage.css'

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, total } = useCart()

    const shipping = total > 499 ? 0 : 49
    const grandTotal = total + shipping

    if (items.length === 0) return (
        <div className="cart-page page">
            <div className="container cart-empty">
                <div className="empty-bag-icon"><ShoppingBag size={56} /></div>
                <h2>Your bag is empty</h2>
                <p>Looks like you haven't added anything yet. Explore our collection!</p>
                <Link to="/shop" className="btn-primary">
                    Start Shopping <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    )

    return (
        <div className="cart-page page">
            <div className="container">
                <h1 className="section-title cart-title">Your Bag <span className="cart-count">({items.length})</span></h1>

                <div className="cart-layout">
                    {/* Items */}
                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/product/${item.id}`} className="cart-item-img-wrap">
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                </Link>
                                <div className="cart-item-info">
                                    <div className="cart-item-header">
                                        <div>
                                            <p className="cart-item-category">{item.category} · {item.material}</p>
                                            <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="cart-item-footer">
                                        <div className="qty-control">
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus size={14} />
                                            </button>
                                            <span className="qty-val">{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            <span className="cart-price-main">{formatPrice(item.price * item.quantity)}</span>
                                            {item.quantity > 1 && (
                                                <span className="cart-price-per">{formatPrice(item.price)} each</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? 'free-tag' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>
                            {shipping > 0 && (
                                <p className="shipping-note">Add {formatPrice(499 - total)} more for free shipping</p>
                            )}
                            <div className="divider" />
                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="btn-primary checkout-btn">
                            Proceed to Checkout <ArrowRight size={16} />
                        </Link>
                        <Link to="/shop" className="btn-ghost continue-btn">
                            Continue Shopping
                        </Link>

                        <div className="secure-badge">
                            🔒 Secure checkout via SSL encryption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
