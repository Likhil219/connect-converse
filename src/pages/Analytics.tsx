import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  MessageCircle,
  TrendingUp,
  MousePointer,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  { 
    name: 'Total Messages', 
    value: '45,234', 
    change: '+15.3%', 
    changeType: 'positive',
    icon: MessageCircle,
    description: 'Last 30 days'
  },
  { 
    name: 'Response Rate', 
    value: '47.2%', 
    change: '+5.2%', 
    changeType: 'positive',
    icon: TrendingUp,
    description: 'vs last month'
  },
  { 
    name: 'Link Clicks', 
    value: '12,847', 
    change: '+22.1%', 
    changeType: 'positive',
    icon: MousePointer,
    description: 'Click-through rate: 28%'
  },
  { 
    name: 'Leads Captured', 
    value: '1,234', 
    change: '-3.2%', 
    changeType: 'negative',
    icon: Users,
    description: 'Conversion rate: 2.7%'
  },
];

const messagesData = [
  { date: 'Jan 1', messages: 1200, responses: 560 },
  { date: 'Jan 5', messages: 1800, responses: 820 },
  { date: 'Jan 10', messages: 1400, responses: 680 },
  { date: 'Jan 15', messages: 2200, responses: 1100 },
  { date: 'Jan 20', messages: 1900, responses: 920 },
  { date: 'Jan 25', messages: 2800, responses: 1400 },
  { date: 'Jan 30', messages: 2400, responses: 1200 },
];

const automationPerformance = [
  { name: 'Welcome Series', messages: 8500, rate: 52 },
  { name: 'Comment Reply', messages: 6200, rate: 45 },
  { name: 'Story Engagement', messages: 4300, rate: 61 },
  { name: 'Lead Magnet', messages: 2100, rate: 38 },
  { name: 'Support Bot', messages: 1800, rate: 72 },
];

const triggerDistribution = [
  { name: 'Comments', value: 40, color: 'hsl(var(--primary))' },
  { name: 'Story Replies', value: 25, color: 'hsl(var(--accent))' },
  { name: 'DM Keywords', value: 20, color: 'hsl(var(--success))' },
  { name: 'New Followers', value: 15, color: 'hsl(var(--warning))' },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black">Analytics</h1>
            <p className="text-muted-foreground">Track your automation performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card variant="elevated">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-sm font-medium flex items-center gap-0.5 ${
                      stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Messages Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Messages & Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={messagesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                        strokeWidth={2}
                        name="Messages Sent"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responses" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        name="Responses"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trigger Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Trigger Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={triggerDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {triggerDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {triggerDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Automation Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Automation Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={automationPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="messages" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Messages" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
