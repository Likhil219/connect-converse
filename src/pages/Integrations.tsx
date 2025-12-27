import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

const integrations = [
  {
    id: 1,
    name: 'Zapier',
    description: 'Connect to 5,000+ apps and automate workflows',
    logo: '⚡',
    connected: true,
    category: 'Automation',
  },
  {
    id: 2,
    name: 'Google Sheets',
    description: 'Sync leads and data to spreadsheets automatically',
    logo: '📊',
    connected: true,
    category: 'Data',
  },
  {
    id: 3,
    name: 'Mailchimp',
    description: 'Add leads to email marketing campaigns',
    logo: '📧',
    connected: false,
    category: 'Email',
  },
  {
    id: 4,
    name: 'Shopify',
    description: 'Connect your store and automate customer messages',
    logo: '🛒',
    connected: false,
    category: 'E-commerce',
  },
  {
    id: 5,
    name: 'HubSpot',
    description: 'Sync contacts and deals with your CRM',
    logo: '🔶',
    connected: false,
    category: 'CRM',
  },
  {
    id: 6,
    name: 'Stripe',
    description: 'Process payments and track transactions',
    logo: '💳',
    connected: false,
    category: 'Payments',
  },
  {
    id: 7,
    name: 'Slack',
    description: 'Get notifications and updates in Slack',
    logo: '💬',
    connected: false,
    category: 'Communication',
  },
  {
    id: 8,
    name: 'Notion',
    description: 'Create pages and databases from automation data',
    logo: '📝',
    connected: false,
    category: 'Productivity',
  },
];

export default function Integrations() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (name: string, connected: boolean) => {
    if (connected) {
      toast.info(`${name} is already connected`);
    } else {
      toast.success(`Connecting to ${name}...`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-black">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Connected */}
        <div>
          <h2 className="text-lg font-bold mb-4">Connected</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.filter(i => i.connected).map((integration, i) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card variant="elevated">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                        {integration.logo}
                      </div>
                      <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                        Connected
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Available */}
        <div>
          <h2 className="text-lg font-bold mb-4">Available Integrations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.filter(i => !i.connected).map((integration, i) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                        {integration.logo}
                      </div>
                      <span className="px-2 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                        {integration.category}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    <Button 
                      variant="gradient" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleConnect(integration.name, integration.connected)}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
