import { Star, Quote } from 'lucide-react'
import './ReviewsPage.css'

const reviews = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        rating: 5,
        date: 'March 1, 2026',
        text: 'The Classic AD Ring I ordered is absolutely stunning! The craftsmanship is incredible and it looks much more expensive than it actually is. Highly recommend!',
        product: 'Classic AD Ring'
    },
    {
        id: 2,
        name: 'Aisha Khan',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        rating: 5,
        date: 'February 28, 2026',
        text: 'I bought the Faux Pearl Minimalist Necklace for my anniversary. My husband loved it, and I wear it almost every day. It hasn\'t lost its shine at all. Very happy with Zevar!',
        product: 'Faux Pearl Minimalist Necklace'
    },
    {
        id: 3,
        name: 'Neha Gupta',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        rating: 4,
        date: 'February 15, 2026',
        text: 'Beautiful packaging and fast delivery. The Vintage Cocktail Ring is very bold and gives a royal feel. I just wish there were more color options available for the stones.',
        product: 'Vintage Cocktail Ring'
    },
    {
        id: 4,
        name: 'Simran Singh',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
        rating: 5,
        date: 'January 20, 2026',
        text: 'The AD Solitaire Pendant is my new favorite piece of jewelry. Every time I wear it to a party, I always get asked where it is from. Thank you, Zevar!',
        product: 'AD Solitaire Pendant'
    },
    {
        id: 5,
        name: 'Anjali Verma',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29021702d',
        rating: 5,
        date: 'January 10, 2026',
        text: 'I ordered three pairs of earrings for my bridesmaids. They arrived perfectly safe and looking exactly like the pictures. The quality really blew us away.',
        product: 'Crystal Dangle Earrings'
    },
    {
        id: 6,
        name: 'Kavya Reddy',
        role: 'Verified Buyer',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29226702d',
        rating: 4,
        date: 'December 22, 2025',
        text: 'Great customer service! I initially received the wrong size bangle, but they replaced it within two days. The Statement Bangle itself is lovely.',
        product: 'Statement Bangle'
    }
]

export default function ReviewsPage() {
    return (
        <div className="reviews-page page">
            <div className="reviews-header">
                <div className="container text-center">
                    <h1 className="reviews-title">Happy Customers</h1>
                    <p className="reviews-subtitle">See what our customers have to say about their Zevar pieces.</p>
                </div>
            </div>

            <div className="container">
                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <Quote size={32} className="review-quote-icon" />
                            <div className="review-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? 'star-filled' : 'star-empty'}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                    />
                                ))}
                            </div>
                            <p className="review-text">"{review.text}"</p>
                            <div className="review-product">
                                Purchased: <span>{review.product}</span>
                            </div>
                            <div className="review-author">
                                <img src={review.avatar} alt={review.name} className="review-avatar" />
                                <div className="review-author-info">
                                    <div className="review-name">{review.name}</div>
                                    <div className="review-meta">
                                        <span className="review-role">{review.role}</span> • <span className="review-date">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="join-family-section text-center container">
                <h2>Join the Zevar Family</h2>
                <p>Experience the luxury of premium artificial jewelry today.</p>
                <a href="/shop" className="btn-primary">Shop Now</a>
            </section>
        </div>
    )
}
