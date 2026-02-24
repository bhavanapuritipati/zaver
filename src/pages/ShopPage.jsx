import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import './ShopPage.css'

const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under ₹20,000', min: 0, max: 20000 },
    { label: '₹20k – ₹40k', min: 20000, max: 40000 },
    { label: '₹40k – ₹60k', min: 40000, max: 60000 },
    { label: 'Above ₹60k', min: 60000, max: Infinity },
]

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Top Rated', value: 'rating' },
]

export default function ShopPage() {
    const [searchParams] = useSearchParams()

    const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all')
    const [priceRange, setPriceRange] = useState(0)
    const [sort, setSort] = useState('featured')
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '')

    // Sync with URL param changes (e.g. clicking Rings / Necklaces in navbar)
    useEffect(() => {
        const cat = searchParams.get('cat') || 'all'
        const q = searchParams.get('search') || ''
        setActiveCategory(cat)
        setLocalSearch(q)
    }, [searchParams])

    const filtered = useMemo(() => {
        let list = products
        // text search
        if (localSearch.trim()) {
            const q = localSearch.toLowerCase()
            list = list.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.material.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            )
        }
        if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
        const range = priceRanges[priceRange]
        list = list.filter(p => p.price >= range.min && p.price <= range.max)
        if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price)
        if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price)
        if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
        return list
    }, [activeCategory, priceRange, sort, localSearch])

    return (
        <div className="shop-page page">
            <div className="container">
                {/* Header */}
                <div className="shop-header">
                    <div>
                        <h1 className="section-title">Our Collection</h1>
                        <p className="section-subtitle">{filtered.length} pieces crafted for you</p>
                    </div>
                    <div className="shop-controls">
                        <select
                            className="sort-select"
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                        >
                            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <button className="filter-toggle-btn" onClick={() => setFiltersOpen(f => !f)}>
                            <SlidersHorizontal size={16} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Search bar on shop page */}
                <div className="shop-search-bar">
                    <Search size={16} className="shop-search-icon" />
                    <input
                        type="text"
                        className="shop-search-input"
                        placeholder="Search rings, necklaces, gold, diamond..."
                        value={localSearch}
                        onChange={e => setLocalSearch(e.target.value)}
                    />
                    {localSearch && (
                        <button className="shop-search-clear" onClick={() => setLocalSearch('')}>
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Filter Panel */}
                {filtersOpen && (
                    <div className="filter-panel">
                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <div className="pill-tabs">
                                {categories.map(c => (
                                    <button
                                        key={c.id}
                                        className={`pill-tab ${activeCategory === c.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(c.id)}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Price Range</label>
                            <div className="pill-tabs">
                                {priceRanges.map((r, i) => (
                                    <button
                                        key={r.label}
                                        className={`pill-tab ${priceRange === i ? 'active' : ''}`}
                                        onClick={() => setPriceRange(i)}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="clear-filters" onClick={() => { setActiveCategory('all'); setPriceRange(0); setSort('featured'); setLocalSearch('') }}>
                            <X size={14} /> Clear All
                        </button>
                    </div>
                )}

                {/* Category Pills (always visible) */}
                <div className="pill-tabs shop-cats">
                    {categories.map(c => (
                        <button
                            key={c.id}
                            className={`pill-tab ${activeCategory === c.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(c.id)}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <Search size={40} style={{ color: 'var(--text-muted)' }} />
                        <p>No products found{localSearch ? ` for "${localSearch}"` : ' for this filter'}.</p>
                        <button className="btn-outline" onClick={() => { setActiveCategory('all'); setPriceRange(0); setLocalSearch('') }}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="product-grid shop-grid">
                        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </div>
        </div>
    )
}
