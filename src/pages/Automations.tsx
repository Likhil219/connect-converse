import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Play,
  Pause,
  Copy,
  BarChart3,
  Trash2,
  MoreVertical,
  MessageCircle,
  Zap,
  Users,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const automations = [
  {
    id: 1,
    name: 'Welcome New Followers',
    description: 'Send a welcome message to new followers',
    status: 'active',
    trigger: 'new_follower',
    triggerIcon: Users,
    messages: 2345,
    responseRate: 52,
    lastActive: '2 min ago',
  },
  {
    id: 2,
    name: 'Comment Reply - Sale Posts',
    description: 'Reply to comments on sale posts with product links',
    status: 'active',
    trigger: 'comment',
    triggerIcon: MessageCircle,
    messages: 1234,
    responseRate: 45,
    lastActive: '15 min ago',
  },
  {
    id: 3,
    name: 'Story Reply Engagement',
    description: 'Engage with users who reply to your stories',
    status: 'active',
    trigger: 'story_reply',
    triggerIcon: Send,
    messages: 876,
    responseRate: 61,
    lastActive: '1 hour ago',
  },
  {
    id: 4,
    name: 'Lead Magnet Delivery',
    description: 'Send lead magnet when users comment "guide"',
    status: 'paused',
    trigger: 'keyword',
    triggerIcon: Zap,
    messages: 543,
    responseRate: 38,
    lastActive: '3 hours ago',
  },
  {
    id: 5,
    name: 'Customer Support Bot',
    description: 'Answer common questions automatically',
    status: 'active',
    trigger: 'keyword',
    triggerIcon: MessageCircle,
    messages: 1890,
    responseRate: 72,
    lastActive: '5 min ago',
  },
  {
    id: 6,
    name: 'Product Launch Sequence',
    description: 'Multi-step nurture sequence for product launches',
    status: 'paused',
    trigger: 'comment',
    triggerIcon: Zap,
    messages: 0,
    responseRate: 0,
    lastActive: 'Never',
  },
];

export default function Automations() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredAutomations = automations.filter((automation) => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black">Automations</h1>
            <p className="text-muted-foreground">Manage your Instagram automation workflows</p>
          </div>
          <Button variant="gradient">
            <Plus className="w-4 h-4 mr-2" />
            Create Automation
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
              {(['all', 'active', 'paused'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                    statusFilter === status
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === 'grid' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === 'list' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Automations Grid/List */}
        {filteredAutomations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No automations found</h3>
            <p className="text-muted-foreground mb-4">Create your first automation to get started</p>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAutomations.map((automation, i) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card variant="elevated" className="hover:scale-[1.01] transition-transform">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <automation.triggerIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          automation.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {automation.status}
                        </div>
                      </div>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>

                    <h3 className="font-bold mb-1">{automation.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{automation.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Messages: </span>
                        <span className="font-medium">{automation.messages.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate: </span>
                        <span className="font-medium text-success">{automation.responseRate}%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                      <Button
                        variant={automation.status === 'active' ? 'outline' : 'default'}
                        size="sm"
                        className="flex-1"
                      >
                        {automation.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAutomations.map((automation, i) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <automation.triggerIcon className="w-5 h-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold truncate">{automation.name}</h3>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            automation.status === 'active' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {automation.status}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{automation.description}</p>
                      </div>

                      <div className="hidden sm:flex items-center gap-8 text-sm">
                        <div className="text-right">
                          <div className="font-medium">{automation.messages.toLocaleString()}</div>
                          <div className="text-muted-foreground">Messages</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-success">{automation.responseRate}%</div>
                          <div className="text-muted-foreground">Rate</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={automation.status === 'active' ? 'outline' : 'default'}
                          size="sm"
                        >
                          {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
