import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import WishlistPage from './pages/WishlistPage'
import ReviewsPage from './pages/ReviewsPage'
import WhatsAppWidget from './components/WhatsAppWidget'
import { useCart } from './context/CartContext'
import './index.css'

function ToastLayer() {
    const { toast } = useCart()
    return (
        <div className={`toast ${toast.show ? 'show' : ''}`}>
            {toast.message}
        </div>
    )
}

function AppInner() {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastLayer />
            <WhatsAppWidget />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default function App() {
    return (
        <WishlistProvider>
            <CartProvider>
                <AppInner />
            </CartProvider>
        </WishlistProvider>
    )
}
