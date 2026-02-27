import { Globe } from 'lucide-react'

export default function Footer() {

    const FOOTERLINKS = [
        {
            title: 'Resources', links: [
                { name: 'Gift Cards', href: '#' },
                { name: 'Corporate Gift Cards', href: '#' },
                { name: 'Find a Store', href: '#' },
                { name: 'Nike Journal', href: '#' },
                { name: 'Become a Member', href: '#' },
                { name: 'Feedback', href: '#' },
                { name: 'Promo Codes', href: '#' },
                { name: 'Product Advice', href: '#' },
                { name: 'Running Shoe Finder', href: '#' }
            ]
        },
        {
            title: 'Help', links: [
                { name: 'Get Help', href: '#' },
                { name: 'Order Status', href: '#' },
                { name: 'Delivery', href: '#' },
                { name: 'Returns', href: '#' },
                { name: 'Payment Options', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Reviews', href: '#' },
                { name: 'Nike Promo Codes Help', href: '#' }
            ]
        },
        {
            title: 'Company', links: [
                { name: 'About Nike', href: '#' },
                { name: 'News', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Investors', href: '#' },
                { name: 'Sustainability', href: '#' },
                { name: 'Purpose', href: '#' },
                { name: 'UK Tax', href: '#' },
                { name: 'UK Pension Statement', href: '#' },
                { name: 'UK Pension SIP', href: '#' },
                { name: 'Report a Concern', href: '#' },
                { name: 'Nike Coaching', href: '#' }
            ]
        },
        {
            title: 'Community Discounts', links: [
                { name: 'Military', href: '#' },
                { name: 'Student', href: '#' },
                { name: 'Teacher', href: '#' },
                { name: 'First Responders', href: '#' },
                { name: 'Medical Professionals', href: '#' }
            ]
        },
    ]

    return (
        <footer className="py-12 px-12 mt-8">
            <div className="border-t border-gray-200 py-8 text-left">
                <ul className="flex text-left justify-between flex-col md:flex-row gap-8 md:gap-4">
                    {FOOTERLINKS.map((section) => (
                        <li key={section.title}>
                            <h3 className="text-md font-semibold mb-8">{section.title}</h3>
                            <ul className="text-sm flex flex-col gap-4 text-gray-600 hover:text-gray-900">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    <div className="gap-2 text-gray-600 hidden lg:flex">
                        <Globe/>
                        <h1>United Kingdom</h1>
                    </div>
                </ul>
                <p className="text-sm text-gray-500 mt-8">&copy; {new Date().getFullYear()} Nike, Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}