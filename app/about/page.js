import React from 'react';
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export const metadata = {
    title: 'About Us | BCA Association',
    description: 'Learn about the BCA Association - Mechi Multiple Campus (MMC), our mission, vision, and activities.',
};

export default function AboutPage() {
    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
                <SectionHeader title="About Us" />

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-700">
                        BCA Association – Mechi Multiple Campus (MMC) is a student-led, non-political
                        organization formed by and for the students of the Bachelor of Computer Applications
                        (BCA) program at Mechi Multiple Campus, Birtamode. Our mission is to foster academic
                        excellence, professional growth, and collaborative development among BCA students
                        through a series of meaningful initiatives, events, and community engagement activities.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
                    <p className="text-lg text-gray-700">
                        To build a vibrant and inclusive community that empowers BCA students to become
                        future-ready tech leaders, innovators, and responsible professionals.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
                    <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                        <li>To bridge the gap between academic learning and real-world application.</li>
                        <li>To create opportunities for skill development, leadership, and networking.</li>
                        <li>
                            To organize workshops, hackathons, competitions, and tech events that
                            enhance student capabilities.
                        </li>
                        <li>
                            To cultivate a culture of collaboration, mentorship, and continuous learning.
                        </li>
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">What We Do</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">Technical Events & Competitions</h3>
                            <p className="text-gray-600">
                                From coding challenges like CodeWar to tech expos and seminars, we provide
                                platforms to test and showcase technical skills.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">Workshops & Trainings</h3>
                            <p className="text-gray-600">
                                Hands-on learning through sessions on programming, AI, web development,
                                app development, and more.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">Career Support</h3>
                            <p className="text-gray-600">
                                Resume building, interview preparation, internship opportunities, and
                                guidance from industry professionals.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">Community Projects</h3>
                            <p className="text-gray-600">
                                Encouraging students to work on real-life projects that serve the local
                                community and enhance their portfolios.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Structure</h2>
                    <p className="text-lg text-gray-700">
                        The association is guided by a team of passionate student leaders, including a
                        President, Vice President, Secretary, Vice Secretary, Treasurer, and Executive
                        Members representing each semester. These roles are filled through a selection
                        and interview process, ensuring transparency, inclusivity, and leadership development.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Innovation</h3>
                            <p className="text-gray-600">Embracing creativity and new ideas in all we do.</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Integrity</h3>
                            <p className="text-gray-600">Operating with transparency, accountability, and ethics.</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Collaboration</h3>
                            <p className="text-gray-600">Working together for shared success.</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Empowerment</h3>
                            <p className="text-gray-600">Enabling every student to reach their full potential.</p>
                        </div>
                    </div>
                </div>

                {/* New Contribute Section */}
                <div className="mb-12 bg-indigo-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Contribute to the Website</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        This website is open-source and We welcome contributions from students, alumni, and anyone interested in improving our digital presence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        <div className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-blue-700">
                                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.986.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                            </svg>
                            <span>Submit bug fixes</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-blue-700">
                                <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                                <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
                            </svg>
                            <span>Add new features</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-blue-700">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                            </svg>
                            <span>Join our team</span>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <a 
                            href="https://github.com/mechimavericks/BCA-Association" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                            </svg>
                            View Source on GitHub
                        </a>
                    </div>
                </div>

                <div className="bg-blue-50 p-10 rounded-xl text-center mb-12">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Join Us</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Whether you're a BCA student looking to grow your skills or someone passionate
                        about tech and community building, the BCA Association – MMC welcomes you.
                        Together, let's learn, lead, and grow.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-block py-3 px-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                        Get Involved
                    </Link>
                </div>
            </div>
        </>
    );
}