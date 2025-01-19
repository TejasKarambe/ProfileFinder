import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 h-screen">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded h-32"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
    