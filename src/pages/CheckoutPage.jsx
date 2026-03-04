import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CreditCard, Smartphone, Package, ChevronRight, Lock, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import './CheckoutPage.css'

const PAYMENT_METHODS = [
    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
    { id: 'upi', label: 'UPI Payment', icon: <Smartphone size={18} /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <Package size={18} /> },
]

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart()
    const navigate = useNavigate()

    const [step, setStep] = useState(1) // 1: Address, 2: Payment
    const [payMethod, setPayMethod] = useState('card')
    const [loading, setLoading] = useState(false)

    const [address, setAddress] = useState({
        name: '', phone: '', email: '', line1: '', line2: '', city: '', state: '', pincode: ''
    })
    const [card, setCard] = useState({ number: '', expiry: '', cvv: '', holder: '' })
    const [upi, setUpi] = useState('')

    const shipping = total > 499 ? 0 : 49
    const grandTotal = total + shipping

    const handleAddressSubmit = (e) => {
        e.preventDefault()
        setStep(2)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePayment = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            clearCart()
            navigate('/order-success')
        }, 2000)
    }

    const formatCardNumber = (val) => {
        return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    const formatExpiry = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 4)
        if (clean.length >= 2) return clean.slice(0, 2) + '/' + clean.slice(2)
        return clean
    }

    if (items.length === 0) return (
        <div className="checkout-page page">
            <div className="container empty-checkout">
                <h2>Nothing to checkout</h2>
                <Link to="/shop" className="btn-primary">Go Shopping</Link>
            </div>
        </div>
    )

    return (
        <div className="checkout-page page">
            <div className="container">
                <h1 className="section-title checkout-title">Checkout</h1>

                {/* Stepper */}
                <div className="stepper">
                    <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                        <div className="step-circle">
                            {step > 1 ? <CheckCircle size={16} /> : '1'}
                        </div>
                        <span>Delivery</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-circle">2</div>
                        <span>Payment</span>
                    </div>
                </div>

                <div className="checkout-layout">
                    <div className="checkout-left">
                        {/* Step 1: Address */}
                        {step === 1 && (
                            <form className="checkout-form" onSubmit={handleAddressSubmit}>
                                <div className="form-section">
                                    <h3 className="form-section-title">Contact Information</h3>
                                    <div className="form-row">
                                        <div className="form-field">
                                            <label className="input-label">Full Name *</label>
                                            <input className="input-field" required placeholder="Priya Sharma"
                                                value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                                        </div>
                                        <div className="form-field">
                                            <label className="input-label">Phone *</label>
                                            <input className="input-field" required placeholder="+91 98765 43210" type="tel"
                                                value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="input-label">Email *</label>
                                        <input className="input-field" required placeholder="priya@example.com" type="email"
                                            value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3 className="form-section-title">Delivery Address</h3>
                                    <div className="form-field">
                                        <label className="input-label">Address Line 1 *</label>
                                        <input className="input-field" required placeholder="House / Flat No., Street"
                                            value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} />
                                    </div>
                                    <div className="form-field">
                                        <label className="input-label">Address Line 2</label>
                                        <input className="input-field" placeholder="Landmark, Colony (optional)"
                                            value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-field">
                                            <label className="input-label">City *</label>
                                            <input className="input-field" required placeholder="Mumbai"
                                                value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                        </div>
                                        <div className="form-field">
                                            <label className="input-label">State *</label>
                                            <input className="input-field" required placeholder="Maharashtra"
                                                value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                                        </div>
                                        <div className="form-field" style={{ maxWidth: '120px' }}>
                                            <label className="input-label">Pincode *</label>
                                            <input className="input-field" required placeholder="400001" maxLength={6}
                                                value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary next-btn">
                                    Continue to Payment <ChevronRight size={16} />
                                </button>
                            </form>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <form className="checkout-form" onSubmit={handlePayment}>
                                <div className="form-section">
                                    <h3 className="form-section-title">Payment Method</h3>
                                    <div className="payment-methods">
                                        {PAYMENT_METHODS.map(pm => (
                                            <label key={pm.id} className={`payment-method-card ${payMethod === pm.id ? 'selected' : ''}`}>
                                                <input type="radio" name="payment" value={pm.id}
                                                    checked={payMethod === pm.id} onChange={() => setPayMethod(pm.id)} hidden />
                                                <span className="pm-icon">{pm.icon}</span>
                                                <span className="pm-label">{pm.label}</span>
                                                <span className="pm-check">{payMethod === pm.id ? '●' : '○'}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Card Fields */}
                                    {payMethod === 'card' && (
                                        <div className="payment-fields fade-in">
                                            <div className="form-field">
                                                <label className="input-label">Card Number *</label>
                                                <input className="input-field" required placeholder="1234 5678 9012 3456"
                                                    value={card.number}
                                                    onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })} />
                                            </div>
                                            <div className="form-field">
                                                <label className="input-label">Cardholder Name *</label>
                                                <input className="input-field" required placeholder="PRIYA SHARMA"
                                                    value={card.holder} onChange={e => setCard({ ...card, holder: e.target.value })} />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-field">
                                                    <label className="input-label">Expiry (MM/YY) *</label>
                                                    <input className="input-field" required placeholder="12/27"
                                                        value={card.expiry}
                                                        onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
                                                </div>
                                                <div className="form-field">
                                                    <label className="input-label">CVV *</label>
                                                    <input className="input-field" required placeholder="•••" maxLength={4} type="password"
                                                        value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value.slice(0, 4) })} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* UPI Field */}
                                    {payMethod === 'upi' && (
                                        <div className="payment-fields fade-in">
                                            <div className="form-field">
                                                <label className="input-label">UPI ID *</label>
                                                <input className="input-field" required placeholder="yourname@upi"
                                                    value={upi} onChange={e => setUpi(e.target.value)} />
                                            </div>
                                            <p className="upi-note">Enter your UPI ID (e.g., name@okaxis, name@ybl)</p>
                                        </div>
                                    )}

                                    {/* COD Note */}
                                    {payMethod === 'cod' && (
                                        <div className="cod-note fade-in">
                                            <Package size={20} />
                                            <p>You will pay <strong>{formatPrice(grandTotal)}</strong> in cash when your order is delivered. COD charges: ₹49</p>
                                        </div>
                                    )}
                                </div>

                                <div className="checkout-btns">
                                    <button type="button" className="btn-ghost back-step-btn" onClick={() => setStep(1)}>
                                        ← Back to Address
                                    </button>
                                    <button type="submit" className="btn-primary pay-btn" disabled={loading}>
                                        {loading ? (
                                            <><span className="spinner" /> Processing...</>
                                        ) : (
                                            <><Lock size={15} /> Pay {formatPrice(grandTotal)}</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="summary-items">
                            {items.map(item => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image} alt={item.name} className="summary-item-img" />
                                    <div className="summary-item-info">
                                        <p className="summary-item-name">{item.name}</p>
                                        <p className="summary-item-qty">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="summary-item-price">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="divider" />
                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal</span><span>{formatPrice(total)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? 'free-tag' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>
                            <div className="divider" />
                            <div className="summary-row total-row">
                                <span>Total</span><span>{formatPrice(grandTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
