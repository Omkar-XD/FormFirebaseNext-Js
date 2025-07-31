'use client';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

async function addDataToFireStore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
  }
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [particles, setParticles] = useState([]);

  // ✅ Generate random positions only after client mounts
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${6 + Math.random() * 4}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("✅ Data Added to Firestore Database Successfully!");
    }
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden">

      {/* 🔹 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg"></div>

      {/* 🔹 Floating Particles */}
      {particles.map((style, i) => (
        <div key={i} className="particle" style={style}></div>
      ))}

      {/* 🔹 Form Card */}
      <div className="relative w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-100 z-10">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📩 Submit Your Details
        </h1>
        <form onSubmit={handlesubmit} className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type='text'
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type='email'
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
              Message
            </label>
            <textarea
              rows={5}
              id="message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-300"
            >
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
