'use client'
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Form submission state
    const [formState, setFormState] = useState({
        isSubmitting: false,
        isSuccess: false,
        error: null
    });

    const testimonials = [
        {
            photo: '/images/testimonial1.jpg',
            message: "This is an amazing service! I loved how easy it was to use.",
            name: "John Doe",
            post: "CEO, Company X"
        },
        {
            photo: '/images/testimonial2.jpg',
            message: "I would highly recommend it to everyone.",
            name: "Jane Smith",
            post: "Marketing Head, Company Y"
        },
        {
            photo: '/images/testimonial3.jpg',
            message: "Fantastic experience, the customer support is excellent.",
            name: "Mike Johnson",
            post: "Manager, Company Z"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = testimonials.length;
    let slideInterval;

    useEffect(() => {
        AOS.init({ duration: 1200, once: false });

        // Start auto-swipe
        startAutoSwipe();

        return () => {
            stopAutoSwipe();
        };
    }, [currentSlide]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset any previous submission states
        setFormState({
            isSubmitting: true,
            isSuccess: false,
            error: null
        });
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            
            // Success! Clear the form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            
            setFormState({
                isSubmitting: false,
                isSuccess: true,
                error: null
            });
            
            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormState(prev => ({
                    ...prev,
                    isSuccess: false
                }));
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error: error.message
            });
        }
    };

    const startAutoSwipe = () => {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    const stopAutoSwipe = () => {
        clearInterval(slideInterval);
    };

    const showSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };

    return (
        <section id="contact" className="relative py-16 bg-gray-800 ">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-white">
                {/* Background image commented out in original code */}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4" data-aos="zoom-in">
                {/* Heading */}
                <SectionHeader title="Get in Touch"/>

                {/* Flex Container */}
                <div className="flex flex-col lg:flex-row gap-6 justify-center">
                    {/* Contact Form */}
                    <div className="lg:w-1/3 bg-transparent text-gray-800 rounded-lg shadow-lg p-6" data-aos="fade-right">
                        <h3 className="text-xl font-bold mb-4 animate-fadeIn">Contact Us</h3>
                        
                        {/* Success message */}
                        {formState.isSuccess && (
                            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                Your message has been received. We'll get back to you soon!
                            </div>
                        )}
                        
                        {/* Error message */}
                        {formState.error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {formState.error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm animate-fadeInUp"
                                disabled={formState.isSubmitting}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm animate-fadeInUp"
                                disabled={formState.isSubmitting}
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Your Message"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm animate-fadeInUp"
                                disabled={formState.isSubmitting}
                                required
                            ></textarea>
                            <button
                                type="submit"
                                disabled={formState.isSubmitting}
                                className={`w-full bg-blue-900 text-white py-2 rounded-md transition duration-300 text-sm animate-bounceIn ${
                                    formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                                }`}
                            >
                                {formState.isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    
                </div>
            </div>
        </section>
    );
}
