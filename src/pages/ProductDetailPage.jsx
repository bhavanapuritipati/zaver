import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Star, ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react'
import { products, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = products.find(p => p.id === Number(id))
    const [activeImg, setActiveImg] = useState(0)
    const [qty, setQty] = useState(1)
    const [addedAnim, setAddedAnim] = useState(false)

    const { addToCart } = useCart()
    const { toggle, isWishlisted } = useWishlist()
    const wishlisted = product ? isWishlisted(product.id) : false

    if (!product) return (
        <div className="page container not-found">
            <h2>Product not found</h2>
            <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
    )

    const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

    const handleAddToCart = () => {
        addToCart(product, qty)
        setAddedAnim(true)
        setTimeout(() => setAddedAnim(false), 600)
    }

    const discount = Math.round((1 - product.price / product.originalPrice) * 100)

    return (
        <div className="product-detail-page page">
            <div className="container">
                {/* Back */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="detail-layout">
                    {/* Images */}
                    <div className="detail-images">
                        <div className="main-img-wrap">
                            <img src={product.images[activeImg] || product.image} alt={product.name} className="main-img" />
                            {product.badge && <span className="badge badge-primary detail-badge">{product.badge}</span>}
                        </div>
                        {product.images.length > 1 && (
                            <div className="thumb-row">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`thumb-btn ${activeImg === i ? 'active' : ''}`}
                                        onClick={() => setActiveImg(i)}
                                    >
                                        <img src={img} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="detail-info">
                        <span className="detail-category">{product.category} · {product.material}</span>
                        <h1 className="detail-name">{product.name}</h1>

                        <div className="detail-rating">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={15} fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'} />
                            ))}
                            <span className="rating-num">{product.rating}</span>
                            <span className="rating-reviews">({product.reviews} reviews)</span>
                        </div>

                        <div className="detail-price-row">
                            <span className="detail-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && <>
                                <span className="detail-original">{formatPrice(product.originalPrice)}</span>
                                <span className="detail-discount">{discount}% off</span>
                            </>}
                        </div>

                        <p className="detail-desc">{product.description}</p>

                        {/* Qty */}
                        <div className="qty-row">
                            <label className="input-label">Quantity</label>
                            <div className="qty-control">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn">−</button>
                                <span className="qty-val">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} className="qty-btn">+</button>
                            </div>
                        </div>

                        <div className="detail-actions">
                            <button
                                className={`btn-primary detail-cart-btn ${addedAnim ? 'pulse' : ''}`}
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag size={18} />
                                Add to Bag
                            </button>
                            <button
                                className={`wishlist-action-btn ${wishlisted ? 'wishlisted' : ''}`}
                                onClick={() => toggle(product)}
                            >
                                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        <Link to="/cart" className="btn-outline buy-now-btn" onClick={() => addToCart(product, qty)}>
                            Buy Now
                        </Link>

                        {/* Trust badges */}
                        <div className="trust-badges">
                            <div className="trust-item"><Shield size={14} /><span>GII Certified</span></div>
                            <div className="trust-item"><Truck size={14} /><span>Free Delivery</span></div>
                            <div className="trust-item"><RotateCcw size={14} /><span>15-day Return</span></div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similar.length > 0 && (
                    <section className="similar-section">
                        <h2 className="section-title">You May Also Like</h2>
                        <div className="product-grid" style={{ marginTop: '24px' }}>
                            {similar.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
