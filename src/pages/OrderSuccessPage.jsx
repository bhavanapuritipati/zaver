import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight, Gem } from 'lucide-react'
import './OrderSuccessPage.css'

export default function OrderSuccessPage() {
    const orderId = `ZVR${Math.floor(Math.random() * 900000 + 100000)}`

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    return (
        <div className="success-page page">
            <div className="container success-container">
                {/* Animated checkmark */}
                <div className="success-icon-wrap">
                    <div className="success-ring" />
                    <CheckCircle size={56} className="success-icon" />
                </div>

                <div className="success-badge">
                    <Gem size={14} />
                    Order Confirmed
                </div>

                <h1 className="success-title">Thank You for Your Order!</h1>
                <p className="success-subtitle">
                    Your order has been placed successfully. We're crafting your jewellery with love and will ship it soon.
                </p>

                <div className="order-info-card">
                    <div className="order-info-row">
                        <span>Order ID</span>
                        <span className="order-id">#{orderId}</span>
                    </div>
                    <div className="order-info-row">
                        <span>Estimated Delivery</span>
                        <span>5–7 Business Days</span>
                    </div>
                    <div className="order-info-row">
                        <span>Tracking</span>
                        <span className="tracking-soon">Email confirmation sent</span>
                    </div>
                </div>

                <div className="success-steps">
                    <div className="success-step done">
                        <div className="success-step-dot"><CheckCircle size={16} /></div>
                        <div>
                            <p className="step-label">Order Placed</p>
                            <p className="step-desc">Your order has been received</p>
                        </div>
                    </div>
                    <div className="success-step-line" />
                    <div className="success-step">
                        <div className="success-step-dot"><Package size={16} /></div>
                        <div>
                            <p className="step-label">Packaging</p>
                            <p className="step-desc">Your jewellery is being packed</p>
                        </div>
                    </div>
                    <div className="success-step-line" />
                    <div className="success-step">
                        <div className="success-step-dot">🚚</div>
                        <div>
                            <p className="step-label">On the Way</p>
                            <p className="step-desc">Out for delivery soon</p>
                        </div>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to="/shop" className="btn-primary">
                        Continue Shopping <ArrowRight size={16} />
                    </Link>
                    <Link to="/" className="btn-outline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
