import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import './ProductCard.css'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()
    const { toggle, isWishlisted } = useWishlist()
    const wishlisted = isWishlisted(product.id)

    return (
        <div className="product-card card fade-in">
            <Link to={`/product/${product.id}`} className="product-image-wrap">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                {product.badge && <span className={`product-badge badge badge-primary`}>{product.badge}</span>}
                <button
                    className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
                    onClick={e => { e.preventDefault(); toggle(product) }}
                    aria-label="Toggle wishlist"
                >
                    <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
            </Link>

            <div className="product-info">
                <p className="product-category">{product.category} · {product.material}</p>
                <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>

                <div className="product-rating">
                    <Star size={12} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="review-count">({product.reviews})</span>
                </div>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-current">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="price-original">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        aria-label="Add to cart"
                    >
                        <ShoppingBag size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}
