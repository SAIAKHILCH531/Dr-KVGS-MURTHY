import React, { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({}) // Add this line to initialize errors state
  const [contactContent, setContactContent] = useState({
    hero: {
      title: 'Contact Us',
      subtitle: 'Get in touch with Dr. KVGS Murthy and KALAGA Herbal Research Labs'
    },
    contactInfo: {
      address: {
        street: '',
        city: '',
        state: '',
        country: ''
      },
      phone: '',
      email: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const docRef = doc(db, 'content', 'contact')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setContactContent(docSnap.data())
        }
      } catch (error) {
        console.error('Error fetching contact content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactContent()
  }, [])

  const validatePhone = (phone) => {
    // Allow empty since phone is optional
    if (!phone) return true
    
    // Remove all non-digit characters for validation
    const digits = phone.replace(/\D/g, '')
    
    // Check if the number has 10-12 digits (typical mobile/landline lengths)
    return digits.length >= 10 && digits.length <= 12
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation (at least 2 words, minimum 3 characters each)
    const nameWords = formData.name.trim().split(/\s+/)
    if (nameWords.length < 2 || nameWords.some(word => word.length < 3)) {
      newErrors.name = 'Please enter your full name (first & last name, minimum 3 characters each)'
    }

    // Email validation (using regex pattern)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (if provided)
    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, '')
      if (digits.length < 10 || digits.length > 12) {
        newErrors.phone = 'Phone number must be between 10-12 digits'
      }
    }

    // Subject validation (minimum 5 characters)
    if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long'
    }

    // Message validation (minimum 20 characters)
    if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields before submission
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Add timestamp to the form data
      const contactData = {
        ...formData,
        timestamp: new Date().toISOString()
      }

      // Save to Firestore
      await addDoc(collection(db, 'contacts'), contactData)

      // Reset form and show success modal
      setShowModal(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error saving contact form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const Modal = () => {
    if (!showModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-600 mb-6">Thank you for contacting us. We will get back to you soon.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#2F5A3D] text-white px-6 py-2 rounded-lg hover:bg-[#2F5A3D]/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="min-h-screen bg-[#f3f9f3] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f3f9f3]">
      {/* Hero Section */}
      <section className="bg-[#2F5A3D] text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{contactContent.hero.title}</h1>
            <p className="text-lg">
              {contactContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="p-8 bg-[#2F5A3D] text-white">
                <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
                <p className="mb-8">
                  Whether you're interested in our treatments, products, or social initiatives,
                  we're here to answer your questions and provide assistance.
                </p>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-white/80">
                        {contactContent.contactInfo.address.street}<br />
                        {contactContent.contactInfo.address.city}<br />
                        {contactContent.contactInfo.address.state}, {contactContent.contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-white/80">{contactContent.contactInfo.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-white/80">{contactContent.contactInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-[#2F5A3D] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#2F5A3D] focus:border-transparent`}
                        placeholder="Your full name"
                        required
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#2F5A3D] focus:border-transparent`}
                        placeholder="Your email address"
                        required
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#2F5A3D] focus:border-transparent`}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#2F5A3D] focus:border-transparent`}
                        placeholder="Message subject"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#2F5A3D] focus:border-transparent`}
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2F5A3D] text-white py-3 px-6 rounded-lg hover:bg-[#2F5A3D]/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <Modal />
    </div>
  )
}

export default Contact