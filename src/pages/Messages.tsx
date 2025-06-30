
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Search, Plus, User, Clock } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      participant: 'Dr. Michael Chen',
      role: 'Doctor',
      lastMessage: 'Patient reports are ready for review',
      timestamp: '10:30 AM',
      unread: 2,
      status: 'online',
    },
    {
      id: 2,
      participant: 'Lisa Rodriguez',
      role: 'Support',
      lastMessage: 'Appointment rescheduled for tomorrow',
      timestamp: '9:45 AM',
      unread: 0,
      status: 'offline',
    },
    {
      id: 3,
      participant: 'Dr. Sarah Johnson',
      role: 'Admin',
      lastMessage: 'Weekly meeting scheduled for Friday',
      timestamp: 'Yesterday',
      unread: 1,
      status: 'busy',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Michael Chen',
      content: 'Hi! I have completed the patient reviews for today.',
      timestamp: '10:25 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Great! Could you send me the reports?',
      timestamp: '10:26 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Dr. Michael Chen',
      content: 'Patient reports are ready for review',
      timestamp: '10:30 AM',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600 mt-1">Internal communication and notifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer border-b hover:bg-slate-50 transition-colors ${
                    selectedChat === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{conversation.participant}</p>
                        <Badge variant="secondary" className="text-xs">
                          {conversation.role}
                        </Badge>
                      </div>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-slate-400 mt-1">{conversation.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <div className="flex flex-col h-full">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor('online')}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Dr. Michael Chen</CardTitle>
                    <CardDescription>Doctor • Online</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 opacity-70" />
                          <p className={`text-xs opacity-70`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Select a conversation</h3>
                <p className="text-slate-600">Choose a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
