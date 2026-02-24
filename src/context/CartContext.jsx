import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [toast, setToast] = useState({ show: false, message: '' })

    const showToast = useCallback((message) => {
        setToast({ show: true, message })
        setTimeout(() => setToast({ show: false, message: '' }), 2500)
    }, [])

    const addToCart = useCallback((product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id)
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
            }
            return [...prev, { ...product, quantity }]
        })
        showToast(`✨ ${product.name} added to cart`)
    }, [showToast])

    const removeFromCart = useCallback((id) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }, [])

    const updateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(i => i.id !== id))
        } else {
            setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
        }
    }, [])

    const clearCart = useCallback(() => setItems([]), [])

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const count = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count, toast }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
