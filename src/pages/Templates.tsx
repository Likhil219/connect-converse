import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Users, Zap, ShoppingBag, Star, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = ['All', 'Welcome', 'Sales', 'Support', 'Lead Gen', 'Engagement'];

const templates = [
  {
    id: 1,
    name: 'Welcome New Followers',
    description: 'Automatically greet new followers with a personalized message',
    category: 'Welcome',
    icon: Users,
    rating: 4.9,
    uses: '12.5K',
  },
  {
    id: 2,
    name: 'Product Launch DM',
    description: 'Send exclusive product info to engaged followers',
    category: 'Sales',
    icon: ShoppingBag,
    rating: 4.8,
    uses: '8.2K',
  },
  {
    id: 3,
    name: 'Comment to DM',
    description: 'Auto-reply to comments with a DM containing more info',
    category: 'Lead Gen',
    icon: MessageCircle,
    rating: 4.9,
    uses: '25.1K',
  },
  {
    id: 4,
    name: 'FAQ Auto-Responder',
    description: 'Answer common questions automatically 24/7',
    category: 'Support',
    icon: Zap,
    rating: 4.7,
    uses: '15.8K',
  },
  {
    id: 5,
    name: 'Story Reply Engagement',
    description: 'Engage with users who reply to your stories',
    category: 'Engagement',
    icon: MessageCircle,
    rating: 4.6,
    uses: '9.4K',
  },
  {
    id: 6,
    name: 'Lead Magnet Delivery',
    description: 'Automatically send lead magnets when triggered',
    category: 'Lead Gen',
    icon: Zap,
    rating: 4.9,
    uses: '18.3K',
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateName: string) => {
    toast.success(`Using "${templateName}" template`);
    navigate('/dashboard/automations/create');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-black">Templates</h1>
          <p className="text-muted-foreground">Start with pre-built automation templates</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card variant="elevated" className="h-full hover:scale-[1.02] transition-transform">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                      {template.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{template.uses} uses</span>
                  </div>

                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.name)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
