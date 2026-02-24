import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './HomePage.css'

const featuredCategories = [
    { id: 'rings', label: 'Rings', emoji: '💍', img: '/images/ring_diamond_solitaire.png' },
    { id: 'necklaces', label: 'Necklaces', emoji: '✨', img: '/images/necklace_diamond.png' },
    { id: 'earrings', label: 'Earrings', emoji: '💎', img: '/images/earring_diamond_drop.png' },
    { id: 'bracelets', label: 'Bracelets', emoji: '🌸', img: '/images/necklace_pearl.png' },
]

const perks = [
    { icon: <Sparkles size={20} />, title: 'Certified Genuine', desc: 'All stones certified by GII' },
    { icon: <Shield size={20} />, title: 'Lifetime Warranty', desc: 'Free repairs & polishing' },
    { icon: <Truck size={20} />, title: 'Free Delivery', desc: 'On orders above ₹5,000' },
]

export default function HomePage() {
    const trending = products.filter(p => ['Trending', 'Bestseller'].includes(p.badge))
    const newArrivals = products.filter(p => p.badge === 'New')

    return (
        <div className="home-page page">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-bg">
                    <img src="/images/hero_banner.png" alt="Zaver Jewellery" className="hero-bg-img" />
                    <div className="hero-overlay" />
                </div>
                <div className="hero-content container">
                    <span className="badge badge-primary hero-tagline">New Collection 2025</span>
                    <h1 className="hero-title">
                        Timeless Beauty,<br />
                        <span className="hero-title-accent">Crafted for You</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover our exclusive collection of handcrafted jewellery — from delicate diamond rings to statement necklaces, each piece tells your story.
                    </p>
                    <div className="hero-actions">
                        <Link to="/shop" className="btn-primary">
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                        <Link to="/shop?cat=rings" className="btn-outline">
                            Shop Rings
                        </Link>
                    </div>
                </div>
            </section>

            {/* Perks */}
            <section className="perks-section">
                <div className="container perks-grid">
                    {perks.map(p => (
                        <div key={p.title} className="perk-item">
                            <div className="perk-icon">{p.icon}</div>
                            <div>
                                <div className="perk-title">{p.title}</div>
                                <div className="perk-desc">{p.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="section container">
                <div className="section-header">
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Find the perfect piece for every moment</p>
                </div>
                <div className="categories-grid">
                    {featuredCategories.map(cat => (
                        <Link key={cat.id} to={`/shop?cat=${cat.id}`} className="category-card">
                            <div className="category-img-wrap">
                                <img src={cat.img} alt={cat.label} className="category-img" />
                                <div className="category-overlay" />
                            </div>
                            <div className="category-label">
                                <span>{cat.emoji} {cat.label}</span>
                                <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trending */}
            <section className="section container">
                <div className="section-header">
                    <h2 className="section-title">Trending Now</h2>
                    <Link to="/shop" className="see-all-link">View All <ArrowRight size={14} /></Link>
                </div>
                <div className="product-grid">
                    {trending.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            {/* Banner */}
            <section className="mid-banner container">
                <div className="mid-banner-inner">
                    <h2>The Wedding Edit</h2>
                    <p>Celebrate love with our curated bridal collection — rings, sets & more</p>
                    <Link to="/shop" className="btn-primary">Shop Bridal</Link>
                </div>
            </section>

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section className="section container">
                    <div className="section-header">
                        <h2 className="section-title">New Arrivals</h2>
                        <Link to="/shop?cat=new" className="see-all-link">View All <ArrowRight size={14} /></Link>
                    </div>
                    <div className="product-grid">
                        {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-logo">ZAVER</div>
                    <p className="footer-tagline">Timeless Jewellery, Crafted for You</p>
                    <div className="footer-links">
                        <a href="#">About Us</a>
                        <a href="#">Contact</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Return Policy</a>
                    </div>
                    <p className="footer-copy">© 2025 Zaver Jewellery. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
