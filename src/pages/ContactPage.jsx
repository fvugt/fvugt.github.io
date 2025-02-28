import React from 'react'
import aboutData from '../data/about.json'

function ContactPage() {
    const { contact, socialMedia, name, shortBio } = aboutData;

    // Filter out social media links that are null or empty
    const activeSocialLinks = Object.entries(socialMedia || {}).filter(
        ([_, url]) => url && url.trim() !== ''
    );

    // Social media icons mapping
    const socialIcons = {
        github: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
        linkedin: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
        ),
        twitter: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
        instagram: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
        ),
        youtube: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
            </svg>
        )
    };

    return (
        <div className="py-8 sm:py-12">

            <div className="max-w-4xl mx-auto">
                {/* Profile and Bio Section */}
                <div className="bg-gradient-to-b from-boxColorA to-boxColorB rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-accentColor">
                                <img
                                    src={aboutData.profilePicture}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accentColor rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
                            <h3 className="text-gray-300 text-lg mb-4">{aboutData.title}</h3>
                            <p className="text-gray-300">{shortBio}</p>
                        </div>
                    </div>
                </div>

                <div className="m-6 p-4 bg-black/20 rounded-lg border border-gray-700 ">
                    <p className="text-gray-300 text-sm">
                        Looking for professional collaboration or have a project idea?
                        Feel free to reach out through any of these channels.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-gradient-to-b from-boxColorA to-boxColorB rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>

                        <div className="space-y-4">
                            {contact?.email && (
                                <div className="flex items-start space-x-4">
                                    <div className="bg-black/30 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accentColor" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Email</h3>
                                        <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-accentColor transition-colors">
                                            {contact.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contact?.location && (
                                <div className="flex items-start space-x-4">
                                    <div className="bg-black/30 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accentColor" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Location</h3>
                                        <p className="text-gray-400">
                                            {contact.location}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {contact?.phone && (
                                <div className="flex items-start space-x-4">
                                    <div className="bg-black/30 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accentColor" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Phone</h3>
                                        <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-accentColor transition-colors">
                                            {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-gradient-to-b from-boxColorA to-boxColorB rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Connect with me</h2>

                        {activeSocialLinks.length > 0 ? (
                            <div className="space-y-4">
                                {activeSocialLinks.map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-4 p-3 bg-black/30 rounded-lg text-gray-400 hover:text-accentColor transition-colors"
                                    >
                                        <div className="p-2 rounded-full bg-black/50">
                                            {socialIcons[platform]}
                                        </div>
                                        <span className="font-medium capitalize">{platform}</span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No social media links available.</p>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage 