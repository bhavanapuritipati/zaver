import { createContext, useContext, useState, useCallback } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
    const [items, setItems] = useState([])

    const toggle = useCallback((product) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === product.id)
            if (exists) return prev.filter(i => i.id !== product.id)
            return [...prev, product]
        })
    }, [])

    const isWishlisted = useCallback((id) => items.some(i => i.id === id), [items])

    return (
        <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext)
