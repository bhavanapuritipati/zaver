import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import './WishlistPage.css'

export default function WishlistPage() {
    const { items, toggle } = useWishlist()
    const { addToCart } = useCart()

    if (items.length === 0) return (
        <div className="wishlist-page page">
            <div className="container wishlist-empty">
                <div className="empty-heart-icon"><Heart size={56} /></div>
                <h2>Your Wishlist is Empty</h2>
                <p>Save your favourite jewellery pieces and find them here anytime.</p>
                <Link to="/shop" className="btn-primary">Explore Collection</Link>
            </div>
        </div>
    )

    return (
        <div className="wishlist-page page">
            <div className="container">
                <h1 className="section-title">My Wishlist <span className="wishlist-count">({items.length})</span></h1>
                <div className="product-grid wishlist-grid">
                    {items.map(item => (
                        <div key={item.id} className="wishlist-card card">
                            <Link to={`/product/${item.id}`} className="wishlist-img-wrap">
                                <img src={item.image} alt={item.name} className="wishlist-img" />
                            </Link>
                            <div className="wishlist-info">
                                <p className="wishlist-cat">{item.category}</p>
                                <Link to={`/product/${item.id}`} className="wishlist-name">{item.name}</Link>
                                <div className="wishlist-price">{formatPrice(item.price)}</div>
                                <div className="wishlist-actions">
                                    <button className="btn-primary wishlist-add-btn" onClick={() => addToCart(item)}>
                                        <ShoppingBag size={14} /> Add to Bag
                                    </button>
                                    <button className="wishlist-remove-btn" onClick={() => toggle(item)}>
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
