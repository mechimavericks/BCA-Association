import { FiPhone, FiMail, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function ContactStrip() {
    return (
        <div className="bg-blue-900 text-white py-2 px-4 z-30 mt-32 text-sm"> {/* Adjust z-index and add margin-top */}
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Contact Information */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <FiPhone />
                        <span className="text-sm">+1 (234) 567-890</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiMail />
                        <span className="text-sm">info@example.com</span>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FiFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FiTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FiLinkedin />
                    </a>
                </div>
            </div>
        </div>
    );
}
