import { MessageCircle } from 'lucide-react'
import './WhatsAppWidget.css'

export default function WhatsAppWidget() {
    // Format the number to remove spaces
    const phoneNumber = '919985282746'
    const defaultMessage = encodeURIComponent('Hello! I want to know more about Zevar products.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-widget"
            aria-label="Chat on WhatsApp"
        >
            <div className="whatsapp-tooltip">Chat with us!</div>
            <div className="whatsapp-icon-wrapper">
                <MessageCircle size={32} />
            </div>
        </a>
    )
}
