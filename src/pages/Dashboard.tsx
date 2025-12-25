import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Zap, 
  BarChart3, 
  Users, 
  TrendingUp,
  MousePointer,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { 
    name: 'Messages Sent Today', 
    value: '2,847', 
    change: '+12.5%', 
    changeType: 'positive',
    icon: MessageCircle 
  },
  { 
    name: 'Active Automations', 
    value: '8', 
    change: '+2', 
    changeType: 'positive',
    icon: Zap 
  },
  { 
    name: 'Response Rate', 
    value: '47%', 
    change: '+3.2%', 
    changeType: 'positive',
    icon: BarChart3 
  },
  { 
    name: 'Link Clicks', 
    value: '1,234', 
    change: '-2.1%', 
    changeType: 'negative',
    icon: MousePointer 
  },
  { 
    name: 'New Leads', 
    value: '89', 
    change: '+18%', 
    changeType: 'positive',
    icon: Users 
  },
  { 
    name: 'Engagement', 
    value: '12.4%', 
    change: '+5.8%', 
    changeType: 'positive',
    icon: TrendingUp 
  },
];

const chartData = [
  { name: 'Mon', messages: 400 },
  { name: 'Tue', messages: 300 },
  { name: 'Wed', messages: 520 },
  { name: 'Thu', messages: 450 },
  { name: 'Fri', messages: 680 },
  { name: 'Sat', messages: 590 },
  { name: 'Sun', messages: 420 },
];

const recentActivity = [
  { type: 'lead', message: 'New lead captured: sarah@example.com', time: '2 min ago' },
  { type: 'dm', message: 'Automation sent 145 DMs for "Welcome Series"', time: '15 min ago' },
  { type: 'trigger', message: 'Comment trigger activated on latest post', time: '32 min ago' },
  { type: 'lead', message: 'New lead captured: mike.johnson@company.com', time: '1 hour ago' },
  { type: 'dm', message: 'Broadcast sent to 1,234 contacts', time: '2 hours ago' },
];

const activeAutomations = [
  { name: 'Welcome New Followers', status: 'active', sent: 2345, rate: '52%' },
  { name: 'Comment Reply - Sale Posts', status: 'active', sent: 1234, rate: '45%' },
  { name: 'Story Reply Engagement', status: 'active', sent: 876, rate: '61%' },
  { name: 'Lead Magnet Delivery', status: 'paused', sent: 543, rate: '38%' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/dashboard/automations">
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card variant="elevated" className="hover:scale-[1.02] transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${
                      stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.name}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Messages Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="messages" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'lead' ? 'bg-success' :
                        activity.type === 'dm' ? 'bg-primary' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Automations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Automations</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/automations">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAutomations.map((automation, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        automation.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <div className="font-medium">{automation.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {automation.sent.toLocaleString()} messages sent
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-success">{automation.rate}</div>
                      <div className="text-sm text-muted-foreground">Response rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
