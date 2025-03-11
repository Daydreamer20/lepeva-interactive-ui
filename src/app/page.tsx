'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-100">
      {/* Header with cloud animation */}
      <header className="w-full px-6 py-4 flex justify-between items-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <Image
                src="https://via.placeholder.com/120/4A90E2/FFFFFF?text=L"
                alt="LEPEVA logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <span className="text-primary-600 font-cartoon text-2xl font-bold">LEPEVA</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 z-10"
        >
          <Link href="/login" className="btn-secondary text-sm py-2 px-4">Log In</Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
        </motion.div>

        {/* Floating clouds */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                width: `${Math.random() * 100 + 100}px`,
                height: `${Math.random() * 40 + 40}px`,
                top: `${Math.random() * 60}px`,
                left: `${i * 20}%`,
              }}
              animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 5 + 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </header>

      <div className="flex-1 w-full max-w-7xl px-6 py-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Hero content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-kids text-primary-700 mb-6">
            Fun English Learning <br />
            <span className="text-accent-500">for Kids!</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 font-cartoon">
            Connect with friendly Filipino teachers and learn English through 
            <span className="text-secondary-500 font-bold"> interactive games</span> and 
            <span className="text-accent-500 font-bold"> fun activities</span>!
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              className="btn-primary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now
            </motion.button>
            
            <motion.button
              className="btn-secondary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Right side - Animated characters */}
        <motion.div 
          className="flex-1 relative h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main character */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-64 h-64">
              <Image
                src="https://via.placeholder.com/400/FF9900/FFFFFF?text=Character"
                alt="Kid character"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Floating elements */}
          {["A", "B", "C", "1", "2", "3"].map((item, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-${
                i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent'
              }-500`}>
                {item}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features section */}
      <motion.section
        className="w-full bg-white py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-kids text-center text-primary-600 mb-12">
            Why Kids <span className="text-secondary-500">Love</span> LEPEVA?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fun Interactive Games",
                description: "Learn through play with our collection of educational games!",
                icon: "🎮",
                color: "primary"
              },
              {
                title: "Friendly Teachers",
                description: "Connect with dedicated Filipino teachers who make learning fun!",
                icon: "👩‍🏫",
                color: "secondary"
              },
              {
                title: "Learn at Your Pace",
                description: "Flexible scheduling that fits your child's learning style!",
                icon: "⏱️",
                color: "accent"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className={`card-kid border-t-4 border-${feature.color}-500`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isLoaded ? 1 : 0, 
                  y: isLoaded ? 0 : 20 
                }}
                transition={{ duration: 0.5, delay: 0.7 + (i * 0.2) }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)" 
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-cartoon font-bold text-${feature.color}-600 mb-2`}>
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section
        className="w-full bg-gradient-to-r from-primary-500 to-accent-500 py-16 px-6 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-kids mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Start Your Child's English Learning Adventure Today!
          </motion.h2>
          <p className="text-lg mb-8 opacity-90 font-cartoon">
            Join thousands of happy kids improving their English skills while having fun!
          </p>
          <motion.button
            className="btn-secondary text-lg px-8 py-4 shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started For Free
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
}