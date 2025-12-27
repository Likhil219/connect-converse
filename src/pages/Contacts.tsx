import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Search, Plus, Mail, Phone, Tag, MoreVertical, Download, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 234 567 8900',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    tags: ['Lead', 'Interested'],
    status: 'Active',
    lastInteraction: '2 hours ago',
  },
  {
    id: 2,
    name: 'Mike Thompson',
    email: 'mike@company.com',
    phone: '+1 234 567 8901',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    tags: ['Customer'],
    status: 'Active',
    lastInteraction: '1 day ago',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma@business.com',
    phone: '+1 234 567 8902',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    tags: ['Lead'],
    status: 'Active',
    lastInteraction: '3 days ago',
  },
  {
    id: 4,
    name: 'Alex Chen',
    email: 'alex@startup.io',
    phone: '+1 234 567 8903',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    tags: ['Customer', 'VIP'],
    status: 'Active',
    lastInteraction: '1 week ago',
  },
  {
    id: 5,
    name: 'Lisa Park',
    email: 'lisa@agency.com',
    phone: '+1 234 567 8904',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    tags: ['Lead'],
    status: 'Inactive',
    lastInteraction: '2 weeks ago',
  },
];

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black">Contacts</h1>
            <p className="text-muted-foreground">Manage your leads and customers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success('Export started')}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={() => toast.info('Import feature coming soon')}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="gradient" onClick={() => toast.info('Add contact feature coming soon')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Contacts Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Contact</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">Email</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden lg:table-cell">Phone</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Tags</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, i) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{contact.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {contact.email}
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {contact.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'Active'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
