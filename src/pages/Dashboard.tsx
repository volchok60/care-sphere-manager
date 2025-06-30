
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Today\'s Appointments',
      value: '24',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Reports',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Revenue (Month)',
      value: '$47,320',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
    { id: 2, patient: 'Emma Wilson', time: '10:30 AM', type: 'Follow-up', status: 'pending' },
    { id: 3, patient: 'Michael Brown', time: '02:00 PM', type: 'Check-up', status: 'confirmed' },
    { id: 4, patient: 'Sarah Davis', time: '03:30 PM', type: 'Consultation', status: 'completed' },
  ];

  const alerts = [
    { id: 1, message: 'Patient John Doe missed appointment', type: 'warning', time: '10 min ago' },
    { id: 2, message: 'New patient registration pending approval', type: 'info', time: '25 min ago' },
    { id: 3, message: 'Lab results ready for Emma Smith', type: 'success', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-slate-600 mt-1">
          Here's what's happening at your clinic today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className={`text-sm flex items-center gap-1 mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
            <CardDescription>
              Upcoming appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{appointment.patient}</p>
                    <p className="text-sm text-slate-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Important notifications and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    alert.type === 'warning' 
                      ? 'bg-yellow-500'
                      : alert.type === 'success'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <p className="text-xs text-slate-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
