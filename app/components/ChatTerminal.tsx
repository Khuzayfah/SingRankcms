'use client';

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import only the specific animations needed instead of the entire framer-motion package
import { useAnimate } from 'framer-motion';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Predefined questions and answers about services
const qaDatabase = [
  {
    keywords: ['seo', 'search engine optimization', 'search', 'ranking', 'google'],
    answer: 'Our SEO services help improve your website visibility on search engines like Google. We optimize your site structure, content, and build quality backlinks to boost your rankings.'
  },
  {
    keywords: ['content', 'strategy', 'writing', 'blog', 'article'],
    answer: 'Our content strategy services include creating engaging, SEO-optimized content that resonates with your audience. We develop comprehensive content plans, write articles, blog posts, and website copy.'
  },
  {
    keywords: ['technical', 'speed', 'performance', 'site audit', 'loading'],
    answer: 'Our technical SEO services focus on improving your website\'s performance. We conduct thorough site audits, optimize page speed, fix crawl errors, and ensure mobile compatibility.'
  },
  {
    keywords: ['local', 'maps', 'google business', 'nearby', 'location'],
    answer: 'Our local SEO services help your business appear in local search results. We optimize your Google Business Profile, improve local citations, and implement location-based keywords.'
  },
  {
    keywords: ['social', 'media', 'facebook', 'instagram', 'linkedin'],
    answer: 'Our social media marketing services help build your brand presence across platforms like Facebook, Instagram, and LinkedIn with engaging content and targeted campaigns.'
  },
  {
    keywords: ['price', 'cost', 'package', 'pricing', 'quotation', 'quote'],
    answer: 'Our pricing is customized based on your specific needs and goals. Please contact us at singrank.sg@gmail.com or call +65 666 999 for a personalized quotation.'
  },
  {
    keywords: ['contact', 'reach', 'email', 'call', 'phone'],
    answer: 'You can reach us via email at singrank.sg@gmail.com or call us at +65 666 999. We\'re also active on Facebook @Khuzayfah.by.redo'
  },
  {
    keywords: ['service', 'services', 'offer', 'offerings', 'provide'],
    answer: 'We offer a range of digital marketing services including SEO, content strategy, technical SEO optimization, local SEO, social media marketing, and web analytics. Type a specific service to learn more!'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'start'],
    answer: 'Hello! Welcome to SINGRANK\'s chat terminal. How can I help you today? You can ask me about our SEO services, content strategy, technical optimizations, or any other digital marketing services.'
  },
  {
    keywords: ['analytics', 'data', 'tracking', 'measurement', 'insights'],
    answer: 'Our analytics services include setting up robust tracking systems to monitor website performance, user behavior, and marketing campaign results. We provide actionable insights and regular reports to help you make data-driven decisions.'
  },
  {
    keywords: ['website', 'web', 'design', 'development', 'redesign'],
    answer: 'SINGRANK offers professional website design and development services with a focus on performance, SEO-friendly structure, and conversion optimization. We create responsive, modern websites that look great on all devices.'
  },
  {
    keywords: ['conversion', 'cro', 'optimization', 'rate', 'sales'],
    answer: 'Our Conversion Rate Optimization (CRO) services help increase the percentage of visitors who take desired actions on your website. We analyze user behavior, optimize landing pages, and implement A/B testing to maximize conversions.'
  },
  {
    keywords: ['ppc', 'ads', 'advertising', 'google ads', 'sem'],
    answer: 'We provide comprehensive Pay-Per-Click (PPC) advertising services, including Google Ads, Facebook Ads, and LinkedIn Ads. Our campaigns are carefully designed to maximize ROI and drive targeted traffic to your website.'
  },
  {
    keywords: ['reputation', 'review', 'reviews', 'management', 'brand'],
    answer: 'Our online reputation management services help monitor, improve, and protect your brand\'s online presence. We employ strategies to generate positive reviews, address negative feedback, and enhance your overall brand perception.'
  },
  {
    keywords: ['mobile', 'responsive', 'app', 'phone', 'tablet'],
    answer: 'We ensure all our digital solutions are mobile-responsive and optimized for all devices. We also provide specialized mobile SEO and mobile app optimization services to improve visibility in app stores and mobile search results.'
  },
  {
    keywords: ['experience', 'background', 'history', 'years', 'established'],
    answer: 'SINGRANK was established in Singapore and has over 5 years of experience in digital marketing. Our team consists of certified SEO specialists, content creators, technical experts, and marketing strategists with proven track records of success.'
  }
];

// Special terminal commands
const terminalCommands: Record<string, string> = {
  help: 'Available commands:\n- help: Display this help message\n- clear: Clear the terminal\n- services: List all our services\n- contact: Display contact information\n- blog: Read our latest blog articles\n- packages: View our service packages',
  clear: 'CLEAR_TERMINAL',
  services: 'SINGRANK offers the following services:\n- Search Engine Optimization (SEO)\n- Content Strategy & Creation\n- Technical SEO & Site Audits\n- Local SEO & Google Business Optimization\n- Social Media Marketing\n- Web Analytics & Reporting\n- Conversion Rate Optimization\n- Pay-Per-Click Advertising\n- Website Design & Development\n- Online Reputation Management\n- Mobile Optimization',
  contact: 'Contact SINGRANK:\n- Email: singrank.sg@gmail.com\n- Phone: +65 666 999\n- Facebook: @Khuzayfah.by.redo\n- Address: Singapore',
  blog: 'Check out our latest blog articles at SINGRANK:\n- The Future of SEO in Singapore\n- How AI is Transforming Digital Marketing\n- Local SEO Strategies for Singapore Businesses\n- Content Marketing Trends for 2023\n- Technical SEO Checklist for E-commerce Websites\n\nVisit our blog section for more insights!',
  packages: 'SINGRANK Service Packages:\n\n1. Starter Package:\n   - Basic SEO setup\n   - Content optimization for 5 key pages\n   - Monthly performance report\n\n2. Growth Package:\n   - Comprehensive SEO strategy\n   - Content creation (4 articles/month)\n   - Technical SEO audit & fixes\n   - Social media management for 2 platforms\n\n3. Premium Package:\n   - Advanced SEO implementation\n   - Content strategy & creation (8 articles/month)\n   - Technical optimization\n   - Complete social media management\n   - PPC campaign management\n   - Monthly strategy meetings\n\nContact us for custom packages and pricing!'
};

// Default bot responses
const defaultResponses = [
  "I'm not sure I understand that question. Could you try asking about our SEO, content, or technical services?",
  "I don't have information about that yet. Would you like to know about our SEO or content marketing services instead?",
  "That's beyond my current knowledge. Can I help you with information about our digital marketing services?",
  "I'm specifically trained to answer questions about SINGRANK's services. Could you ask something related to our offerings?",
  "I'm not sure about that. Try typing 'help' to see available commands or ask about specific services we offer.",
  "I don't have data on that topic yet. You can type 'services' to see a full list of our service offerings."
];

// Helper functions moved outside component to prevent recreation on each render
const getRandomDefaultResponse = () => {
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const findAnswer = (question: string) => {
  const lowerCaseQuestion = question.toLowerCase();
  
  // First check if it's a terminal command
  if (lowerCaseQuestion.startsWith('/')) {
    const command = lowerCaseQuestion.substring(1);
    if (terminalCommands[command]) {
      return terminalCommands[command];
    }
  }
  
  // Check terminal commands without slash prefix
  if (terminalCommands[lowerCaseQuestion]) {
    return terminalCommands[lowerCaseQuestion];
  }
  
  // Check against QA database
  for (const qa of qaDatabase) {
    if (qa.keywords.some(keyword => lowerCaseQuestion.includes(keyword))) {
      return qa.answer;
    }
  }
  
  return getRandomDefaultResponse();
};

// Simple error fallback
const ErrorFallback = () => (
  <div className="fixed bottom-6 right-6 bg-red-50 shadow-lg rounded-lg p-4 z-50 text-red-600">
    Error loading chat. Please refresh the page.
  </div>
);

// Memoize the message item component to prevent unnecessary re-renders
const MessageItem = React.memo(({ message }: { message: Message }) => {
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isBot = message.sender === 'bot';
  return (
    <div className={`mb-3 ${isBot ? 'text-left' : 'text-right'}`}>
      <div 
        className={`inline-block px-4 py-2 rounded-lg max-w-[85%] ${
          isBot 
            ? 'bg-gray-100 text-gray-900' 
            : 'bg-[#d13239] text-white'
        }`}
      >
        <p className="text-sm whitespace-pre-line">{message.content}</p>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {formatTimestamp(message.timestamp)}
      </div>
    </div>
  );
});

MessageItem.displayName = 'MessageItem';

// Main component with reduced re-renders
export default function ChatTerminal() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Only initialize the component when it's actually opened to save resources
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasInteracted(true);
    
    // Send welcome message if this is the first time opening
    if (messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([
            {
              content: "Hello! I'm SINGRANK's virtual assistant. How can I help you today? Type 'help' to see what I can do.",
              sender: 'bot',
              timestamp: new Date()
            }
          ]);
          setIsTyping(false);
        }, 1000);
      }, 500);
    }
    
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Handle clear command
    if (input.toLowerCase() === 'clear' || input.toLowerCase() === '/clear') {
      setTimeout(() => {
        setMessages([]);
      }, 300);
      return;
    }
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process the message with a slight delay to simulate thinking
    setTimeout(() => {
      const botResponse = findAnswer(input);
      
      // Add bot message
      const botMessage: Message = {
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Only render the full component when the user has interacted with it
  if (!hasInteracted) {
    return (
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 bg-[#d13239] text-white p-4 rounded-full shadow-lg hover:bg-[#b02a31] transition-all duration-300"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[460px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Terminal header */}
          <div className="bg-[#d13239] text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-sm">SINGRANK Terminal</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Minimize"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasInteracted(false);
                }}
                className="text-white hover:text-gray-200"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages container */}
          <div className="h-[370px] overflow-y-auto p-4 bg-white">
            {messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="text-left mb-3">
                <div className="inline-block px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2 bg-gray-50">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d13239] focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#d13239] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b02a31] transition-colors"
                disabled={isTyping}
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-50 bg-[#d13239] text-white p-4 rounded-full shadow-lg hover:bg-[#b02a31] transition-all duration-300"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 