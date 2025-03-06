'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
const terminalCommands = {
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

const getRandomDefaultResponse = () => {
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return defaultResponses[randomIndex];
};

const findAnswer = (question: string) => {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Check if it's a command
  if (terminalCommands[normalizedQuestion as keyof typeof terminalCommands]) {
    return terminalCommands[normalizedQuestion as keyof typeof terminalCommands];
  }
  
  // Check if the question contains any of the keywords in our database
  for (const qa of qaDatabase) {
    if (qa.keywords.some(keyword => normalizedQuestion.includes(keyword))) {
      return qa.answer;
    }
  }
  
  // If no matching keywords, return a default response
  return getRandomDefaultResponse();
};

// Error boundary for client components
const ErrorFallback = () => {
  return (
    <div className="hidden">
      {/* Hidden error state that doesn't break the UI */}
    </div>
  );
};

export default function ChatTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize messages on client-side only
  useEffect(() => {
    setMessages([
      {
        content: "SINGRANK Terminal v1.0 initialized...\nWelcome! Ask me anything about our services or type 'help' for available commands.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);
  
  // Set notification after 30 seconds
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setHasNewNotification(true);
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  
  // Clear notification when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewNotification(false);
    }
  }, [isOpen]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      // Hide typing indicator
      setIsTyping(false);
      
      const botResponse = findAnswer(inputValue);
      
      // Special command to clear terminal
      if (botResponse === 'CLEAR_TERMINAL') {
        setMessages([{
          content: "Terminal cleared. Type 'help' for available commands.",
          sender: 'bot',
          timestamp: new Date()
        }]);
        return;
      }
      
      const botMessage: Message = {
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 1500); // Random delay between 1000-2500ms
  };
  
  const formatTimestamp = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };
  
  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-black/60 text-white text-sm rounded-full px-3 py-1 mr-2 shadow-lg backdrop-blur-sm"
          >
            Ask about our services
          </motion.div>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-[#d13239] to-[#ff4555] text-white p-3 rounded-full shadow-lg flex items-center justify-center relative z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat terminal"
        >
          {/* Notification indicator */}
          {hasNewNotification && !isOpen && (
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-[#27c93f] rounded-full border-2 border-black z-20"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <>
              <motion.div
                className="absolute w-full h-full rounded-full bg-white/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </>
          )}
        </motion.button>
      </div>
      
      {/* Terminal Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-16 right-4 z-50 w-80 sm:w-96 h-[450px] bg-[#0f0f0f] rounded-md overflow-hidden shadow-2xl border border-[#333] flex flex-col"
          >
            {/* Terminal header */}
            <div className="bg-[#222] px-4 py-2 flex items-center justify-between border-b border-[#333]">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-[#ff5f56] rounded-full"></span>
                <span className="w-3 h-3 bg-[#ffbd2e] rounded-full"></span>
                <span className="w-3 h-3 bg-[#27c93f] rounded-full"></span>
              </div>
              <div className="text-white/80 text-xs font-mono">SINGRANK-Terminal</div>
              <div className="text-white/50 text-xs font-mono">v1.0</div>
            </div>
            
            {/* Welcome Message Alert */}
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#27c93f]/10 border-l-4 border-[#27c93f] px-4 py-2 text-[#27c93f] text-xs"
            >
              💡 Tip: Try typing "help" to see available commands
            </motion.div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm" style={{ backgroundColor: '#0f0f0f' }}>
              {messages.map((message, index) => (
                <div key={index} className={`mb-3 ${message.sender === 'user' ? 'text-green-500' : 'text-white'}`}>
                  <span className="text-[#666] mr-2">[{formatTimestamp(message.timestamp)}]</span>
                  <span className={message.sender === 'user' ? 'text-[#d13239]' : 'text-[#27c93f]'}>
                    {message.sender === 'user' ? '>' : '$'}
                  </span>{' '}
                  {message.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-3 text-white">
                  <span className="text-[#666] mr-2">[{formatTimestamp(new Date())}]</span>
                  <span className="text-[#27c93f]">$</span>{' '}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block"
                  >
                    <span className="mr-1">•</span>
                    <span className="mr-1">•</span>
                    <span>•</span>
                  </motion.span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input field */}
            <form onSubmit={handleSubmit} className="border-t border-[#333] p-2 bg-[#1a1a1a]">
              <div className="flex items-center">
                <span className="text-[#d13239] mx-2 font-mono">{'>'}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent text-white border-none outline-none font-mono text-sm"
                  placeholder="Type your question..."
                  autoFocus
                  disabled={isTyping}
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 