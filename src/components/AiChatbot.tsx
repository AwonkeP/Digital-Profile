import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';
import { PROFILE_INFO } from '../data';
import { resolveClientSideGroundedFallback } from '../utils/aiAssistantFallback';

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: "Hello! I am Awonke's interactive AI Profile Assistant. I answer questions strictly based on his profile. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickChips = [
    'Current Role @ IT Support',
    'Current Company @CAPACITI',
    'Education @CPUT Diploma',
    'Work Experience',
    'Contact Info & Links',
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    // Provide rich conversational persona and grounded portfolio data
    const systemPrompt = `
You are the interactive AI Assistant for Awonke Philibane's digital profile portfolio.
Your goal is to converse naturally, warmly, and professionally with recruiters, collaborators, and visitors.

Guidelines:
- Tone: Welcoming, articulate, confident, and professional yet approachable.
- Knowledge base: Strictly grounded in Awonke's background, education (CPUT Diploma), IT Support role at CAPACITI, full-stack & web development projects, and contact info.
- Conversational flow:
  * Acknowledge greetings or casual remarks politely before offering relevant profile details.
  * Answer questions directly, then briefly invite follow-ups (e.g., "Would you like to see the tech stack he used for that project, or his contact links?").
  * If asked something outside Awonke's professional domain or personal profile, gently guide them back: "Acknowledge the user request first", "I specialize in Awonke's professional experience, technical skills, and projects. Let me know if you'd like to hear about his latest work or background!"
- Formatting: Use concise paragraphs, clean bullet points, or bold text for readability. Avoid walls of text.
`.trim();

    const conversationHistory = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      text: m.text,
    }));

    try {
      let replyText = '';

      // 1. Send request with persona system instructions
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            systemPrompt,
            conversationHistory,
            profileData: PROFILE_INFO,
          }),
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data && typeof data.response === 'string' && data.response.trim()) {
              replyText = data.response;
            }
          }
        }
      } catch (networkErr) {
        console.warn('Call to /api/chat failed:', networkErr);
      }

      // 2. Client-side fallback if offline or API unavailable
      if (!replyText) {
        replyText = resolveClientSideGroundedFallback(trimmed, conversationHistory);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chatbot processing error:', err);
      const fallbackReply = resolveClientSideGroundedFallback(trimmed, conversationHistory);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputQuery);
  };

  return (
    <div id="chatbot-container" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          id="chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="flex items-center gap-2.5 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group border border-neutral-700 dark:border-neutral-300 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 dark:text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-neutral-900 dark:border-white animate-pulse"></span>
          </div>
          <span className="font-bold text-xs sm:text-sm">Ask AI Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="w-[92vw] sm:w-[440px] h-[540px] max-h-[82vh] rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 text-neutral-950 dark:text-neutral-100"
        >
          {/* Header */}
          <div className="p-4 bg-neutral-950 dark:bg-black text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={PROFILE_INFO.profileImage}
                  alt={PROFILE_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white border border-neutral-800 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-neutral-900" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight text-white">
                  Awonke's AI Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online • Strictly Profile Grounded</span>
                </div>
              </div>
            </div>

            <button
              id="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="p-1.5 text-neutral-400 hover:text-white transition-colors rounded-xl hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap shrink-0">
            <span className="text-neutral-500 dark:text-neutral-400 font-bold text-[11px] mr-1">Quick ask:</span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 text-neutral-900 dark:text-neutral-100 text-[11px] font-bold transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-white dark:bg-neutral-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-neutral-950 dark:bg-neutral-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-neutral-800 dark:border-neutral-700">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-tr-none shadow-sm font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 rounded-tl-none border border-neutral-200 dark:border-neutral-700 font-medium'
                  }`}
                >
                  <div className="markdown-body space-y-1.5">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.role === 'user' ? 'text-neutral-400 dark:text-neutral-600 text-right' : 'text-neutral-500 dark:text-neutral-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-neutral-950 dark:bg-neutral-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                  <span className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-200 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-200 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-200 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              id="chat-input-field"
              placeholder="Ask strictly based on Awonke's profile..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-neutral-50 dark:bg-neutral-800 text-neutral-950 dark:text-white text-xs rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white border border-neutral-300 dark:border-neutral-700 font-medium placeholder-neutral-500 dark:placeholder-neutral-400"
            />
            <button
              type="submit"
              id="chat-submit-btn"
              disabled={!inputQuery.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-40 text-white dark:text-neutral-950 flex items-center justify-center transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
