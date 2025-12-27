import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Instagram,
  MessageCircle,
  Plus,
  Check,
  Heart,
  Send,
  Image,
  Play,
  Sparkles,
  Trash2,
  ChevronRight,
  Link2,
  RefreshCw,
  Eye,
  Settings,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock Instagram posts
const mockPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=300&fit=crop',
    caption: '✨ New product launch! Comment "INFO" to get exclusive details...',
    likes: 2345,
    comments: 187,
    date: '2 days ago',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    caption: '🔥 Limited time offer! Drop a 🔥 if you want the link...',
    likes: 1876,
    comments: 234,
    date: '5 days ago',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    caption: 'Best selling product of the month! Comment "WANT" for the discount code...',
    likes: 3421,
    comments: 412,
    date: '1 week ago',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
    caption: 'Summer collection is here ☀️ Comment your favorite color!',
    likes: 1543,
    comments: 98,
    date: '1 week ago',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    caption: 'Giveaway alert! 🎁 Like & comment to enter...',
    likes: 5678,
    comments: 567,
    date: '2 weeks ago',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
    caption: 'Behind the scenes 📸 Ask me anything in the comments!',
    likes: 987,
    comments: 76,
    date: '2 weeks ago',
  },
];

const triggerOptions = [
  { id: 'any', label: 'Any comment', description: 'Reply to all comments on this post' },
  { id: 'exact', label: 'Exact comment match', description: 'Reply only when comment matches exactly' },
  { id: 'keyword', label: 'Specific keywords', description: 'Reply when comments contain specific words' },
  { id: 'emoji', label: 'Emoji reactions', description: 'Reply when comments include specific emojis' },
];

const messageTemplates = [
  { id: 1, name: 'Welcome Message', content: "Hey {name}! 👋 Thanks for commenting! Here's your exclusive link: {link}" },
  { id: 2, name: 'Product Info', content: "Hi {name}! Here's the product info you requested: {link}\n\nLet me know if you have any questions!" },
  { id: 3, name: 'Discount Code', content: "🎉 {name}, you're awesome! Use code SAVE20 for 20% off: {link}" },
];

export default function AutomationBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [triggerType, setTriggerType] = useState('any');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [exactTriggerComment, setExactTriggerComment] = useState('');
  const [replyMessage, setReplyMessage] = useState("Hey {name}! 👋 Thanks for your comment! Here's what you requested: {link}");
  const [automationName, setAutomationName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim().toLowerCase())) {
      setKeywords([...keywords, keywordInput.trim().toLowerCase()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => {
      navigate('/dashboard/automations');
    }, 1500);
  };

  const selectedPostData = mockPosts.find(p => p.id === selectedPost);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard/automations')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-black mb-2">Create Comment Automation</h1>
          <p className="text-muted-foreground">Automatically reply to comments on your Instagram posts</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step === s 
                  ? "bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : step > s 
                    ? "bg-success text-success-foreground" 
                    : "bg-secondary text-muted-foreground"
              )}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div className={cn(
                  "w-12 h-1 rounded-full transition-colors",
                  step > s ? "bg-success" : "bg-secondary"
                )} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Connect Instagram */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <CardHeader className="bg-gradient-hero border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Connect Instagram Account</h2>
                      <p className="text-sm text-muted-foreground font-normal">Link your Instagram business account to get started</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {!isConnected ? (
                    <div className="text-center py-8">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 flex items-center justify-center">
                        <Instagram className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Connect your Instagram</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Connect your Instagram Business or Creator account to start automating your DMs
                      </p>
                      <Button
                        variant="gradient"
                        size="lg"
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="min-w-[200px]"
                      >
                        {isConnecting ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Instagram className="w-5 h-5 mr-2" />
                            Connect Instagram
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        We only request permissions needed for automation
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-success/10 flex items-center justify-center"
                      >
                        <Check className="w-12 h-12 text-success" />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2 text-success">Connected Successfully!</h3>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=instagram" 
                          alt="" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-left">
                          <div className="font-semibold">@yourbrand</div>
                          <div className="text-sm text-muted-foreground">Business Account</div>
                        </div>
                      </div>
                      <Button variant="gradient" size="lg" onClick={() => setStep(2)}>
                        Continue
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Select Post */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Image className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Select Instagram Post</h2>
                      <p className="text-sm text-muted-foreground font-normal">Choose a post to automate comment replies</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {mockPosts.map((post) => (
                      <motion.button
                        key={post.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPost(post.id)}
                        className={cn(
                          "relative rounded-xl overflow-hidden aspect-square group transition-all",
                          selectedPost === post.id 
                            ? "ring-4 ring-primary ring-offset-2 ring-offset-background" 
                            : "hover:ring-2 hover:ring-primary/50"
                        )}
                      >
                        <img 
                          src={post.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                        {selectedPost === post.id && (
                          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {selectedPostData && (
                    <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                      <div className="flex items-start gap-3">
                        <img 
                          src={selectedPostData.image} 
                          alt="" 
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm line-clamp-2">{selectedPostData.caption}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{selectedPostData.likes.toLocaleString()} likes</span>
                            <span>{selectedPostData.comments} comments</span>
                            <span>{selectedPostData.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      className="flex-1"
                      disabled={!selectedPost}
                      onClick={() => setStep(3)}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Configure Trigger & Reply */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Trigger Configuration */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Comment Trigger</h2>
                      <p className="text-sm text-muted-foreground font-normal">When should the auto-reply be sent?</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 mb-6">
                    {triggerOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTriggerType(option.id)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all",
                          triggerType === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                          {triggerType === option.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Exact Comment Match */}
                  {triggerType === 'exact' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6"
                    >
                      <label className="block text-sm font-medium mb-2">
                        Exact comment to trigger reply
                      </label>
                      <Input
                        placeholder="e.g., INFO, WANT, LINK, 🔥"
                        value={exactTriggerComment}
                        onChange={(e) => setExactTriggerComment(e.target.value)}
                        className="mb-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        The automation will only trigger when someone comments this exact text (case-insensitive)
                      </p>
                      {exactTriggerComment && (
                        <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20">
                          <div className="flex items-center gap-2 text-success text-sm font-medium mb-2">
                            <Check className="w-4 h-4" />
                            Preview
                          </div>
                          <p className="text-sm text-muted-foreground">
                            When someone comments "<span className="font-semibold text-foreground">{exactTriggerComment}</span>", they'll receive your auto-reply DM
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {triggerType === 'keyword' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6"
                    >
                      <label className="block text-sm font-medium mb-2">Keywords to trigger reply</label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          placeholder="Type a keyword and press Enter"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        />
                        <Button onClick={addKeyword} variant="secondary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword) => (
                            <span 
                              key={keyword}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center gap-2"
                            >
                              {keyword}
                              <button 
                                onClick={() => removeKeyword(keyword)}
                                className="hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Examples: "info", "price", "link", "want", "🔥"
                      </p>
                    </motion.div>
                  )}

                  {triggerType === 'emoji' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6"
                    >
                      <label className="block text-sm font-medium mb-2">Emojis to trigger reply</label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          placeholder="Type an emoji and press Enter"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        />
                        <Button onClick={addKeyword} variant="secondary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword) => (
                            <span 
                              key={keyword}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center gap-2"
                            >
                              {keyword}
                              <button 
                                onClick={() => removeKeyword(keyword)}
                                className="hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Examples: 🔥, ❤️, 💯, 🙌
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Reply Message */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Auto-Reply Message</h2>
                      <p className="text-sm text-muted-foreground font-normal">Customize the DM that will be sent</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Templates */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Quick Templates</label>
                    <div className="flex flex-wrap gap-2">
                      {messageTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setReplyMessage(template.content)}
                          className="px-3 py-1.5 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                        >
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Editor */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Message Content</label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border-0 resize-none focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="Type your auto-reply message..."
                    />
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">{'{name}'}</span>
                      <span>User's name</span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono ml-3">{'{link}'}</span>
                      <span>Your link</span>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-4 rounded-xl bg-gradient-hero border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="flex gap-3">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=brand"
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 p-3 rounded-xl bg-primary/10 text-sm whitespace-pre-wrap">
                        {replyMessage.replace('{name}', 'Sarah').replace('{link}', 'https://yourlink.com/offer')}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      className="flex-1"
                      onClick={() => setStep(4)}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review & Activate */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card variant="elevated">
                <CardHeader className="bg-gradient-hero border-b border-border">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Review & Activate</h2>
                      <p className="text-sm text-muted-foreground font-normal">Review your automation before going live</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Automation Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Automation Name</label>
                    <Input
                      value={automationName}
                      onChange={(e) => setAutomationName(e.target.value)}
                      placeholder="e.g., Product Launch Comment Reply"
                      className="text-lg font-medium"
                    />
                  </div>

                  {/* Summary */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Instagram className="w-5 h-5 text-primary" />
                        <span className="font-medium">Connected Account</span>
                      </div>
                      <div className="flex items-center gap-3 ml-8">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=instagram" 
                          alt="" 
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-muted-foreground">@yourbrand</span>
                      </div>
                    </div>

                    {selectedPostData && (
                      <div className="p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Image className="w-5 h-5 text-primary" />
                          <span className="font-medium">Selected Post</span>
                        </div>
                        <div className="flex items-center gap-3 ml-8">
                          <img 
                            src={selectedPostData.image} 
                            alt="" 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                            {selectedPostData.caption}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="font-medium">Trigger</span>
                      </div>
                      <div className="ml-8 text-muted-foreground">
                        {triggerType === 'any' && 'Reply to all comments'}
                        {triggerType === 'keyword' && `Reply when comment contains: ${keywords.join(', ') || 'No keywords set'}`}
                        {triggerType === 'emoji' && 'Reply when comment contains specific emojis'}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Send className="w-5 h-5 text-primary" />
                        <span className="font-medium">Auto-Reply Message</span>
                      </div>
                      <div className="ml-8 p-3 rounded-lg bg-background text-sm whitespace-pre-wrap">
                        {replyMessage}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      className="flex-1"
                      onClick={handleCreate}
                      disabled={isCreating || !automationName}
                    >
                      {isCreating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Creating Automation...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Activate Automation
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}