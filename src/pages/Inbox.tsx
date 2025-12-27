import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, MessageCircle, Send, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    lastMessage: 'Thanks for the info! I\'ll check it out.',
    time: '2 min ago',
    unread: true,
    messages: [
      { id: 1, text: 'Hi! I saw your post about the guide.', sender: 'user', time: '10 min ago' },
      { id: 2, text: 'Hey Sarah! Thanks for reaching out. Here\'s the link to download: example.com/guide', sender: 'bot', time: '10 min ago' },
      { id: 3, text: 'Thanks for the info! I\'ll check it out.', sender: 'user', time: '2 min ago' },
    ]
  },
  {
    id: 2,
    name: 'Mike Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    lastMessage: 'What\'s the price for the premium plan?',
    time: '15 min ago',
    unread: true,
    messages: [
      { id: 1, text: 'What\'s the price for the premium plan?', sender: 'user', time: '15 min ago' },
    ]
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    lastMessage: 'Got it, thanks!',
    time: '1 hour ago',
    unread: false,
    messages: [
      { id: 1, text: 'Do you ship internationally?', sender: 'user', time: '2 hours ago' },
      { id: 2, text: 'Yes! We ship to over 50 countries. Shipping usually takes 5-10 business days.', sender: 'bot', time: '2 hours ago' },
      { id: 3, text: 'Got it, thanks!', sender: 'user', time: '1 hour ago' },
    ]
  },
  {
    id: 4,
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    lastMessage: 'Welcome to our community! 🎉',
    time: '3 hours ago',
    unread: false,
    messages: [
      { id: 1, text: 'Welcome to our community! 🎉', sender: 'bot', time: '3 hours ago' },
    ]
  },
];

export default function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="flex h-full bg-card rounded-xl border border-border overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left",
                    selectedConversation.id === conversation.id && "bg-secondary"
                  )}
                >
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{conversation.name}</span>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{selectedConversation.name}</h3>
                <p className="text-sm text-muted-foreground">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? 'justify-start' : 'justify-end'
                  )}
                >
                  <div className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2",
                    message.sender === 'user' 
                      ? 'bg-secondary text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  )}>
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      message.sender === 'user' ? 'text-muted-foreground' : 'text-primary-foreground/70'
                    )}>
                      {message.sender === 'bot' && '🤖 Bot • '}{message.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="gradient" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
