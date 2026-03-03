import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X, Gem } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Navbar.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { count } = useCart()
    const { count: wishCount } = useWishlist()
    const location = useLocation()
    const navigate = useNavigate()

    const links = [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Shop' },
        { to: '/shop?cat=rings', label: 'Rings' },
        { to: '/shop?cat=necklaces', label: 'Necklaces' },
        { to: '/shop?cat=earrings', label: 'Earrings' },
    ]

    // Check active state including query params
    const isActive = (to) => {
        const [path, query] = to.split('?')
        if (query) {
            return location.pathname === path && location.search === '?' + query
        }
        return location.pathname === to && !location.search
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchOpen(false)
            setSearchQuery('')
        }
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch(e)
        if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') }
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <Gem size={20} className="logo-icon" />
                    <span>ZEVAR</span>
                </Link>

                {/* Desktop Nav */}
                <div className="navbar-links">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className={`nav-link ${isActive(l.to) ? 'active' : ''}`}>
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    {searchOpen ? (
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search jewellery..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                autoFocus
                                className="search-input"
                            />
                            <button type="submit" className="icon-btn search-submit-btn" aria-label="Search">
                                <Search size={16} />
                            </button>
                            <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="icon-btn">
                                <X size={18} />
                            </button>
                        </form>
                    ) : (
                        <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Open search">
                            <Search size={20} />
                        </button>
                    )}

                    <Link to="/wishlist" className="icon-btn icon-with-badge">
                        <Heart size={20} />
                        {wishCount > 0 && <span className="badge-dot">{wishCount}</span>}
                    </Link>

                    <Link to="/cart" className="icon-btn icon-with-badge cart-btn">
                        <ShoppingBag size={20} />
                        {count > 0 && <span className="badge-dot">{count}</span>}
                    </Link>

                    <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
                            {l.label}
                        </Link>
                    ))}
                    <Link to="/wishlist" className="mobile-link" onClick={() => setMenuOpen(false)}>
                        Wishlist {wishCount > 0 && `(${wishCount})`}
                    </Link>
                    <Link to="/cart" className="mobile-link" onClick={() => setMenuOpen(false)}>
                        Cart {count > 0 && `(${count})`}
                    </Link>
                </div>
            )}
        </nav>
    )
}
