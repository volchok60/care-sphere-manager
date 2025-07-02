
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Plus, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  const appointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '09:00 AM',
      duration: 30,
      type: 'Consultation',
      status: 'confirmed',
      doctor: 'Dr. Johnson',
    },
    {
      id: 2,
      patient: 'Emma Wilson',
      time: '10:30 AM',
      duration: 45,
      type: 'Follow-up',
      status: 'pending',
      doctor: 'Dr. Chen',
    },
    {
      id: 3,
      patient: 'Michael Brown',
      time: '02:00 PM',
      duration: 30,
      type: 'Check-up',
      status: 'confirmed',
      doctor: 'Dr. Johnson',
    },
    {
      id: 4,
      patient: 'Sarah Davis',
      time: '03:30 PM',
      duration: 60,
      type: 'Consultation',
      status: 'completed',
      doctor: 'Dr. Chen',
    },
  ];

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-600 mt-1">Manage your clinic appointments and schedule</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              {['day', 'week', 'month'].map((viewType) => (
                <Button
                  key={viewType}
                  variant={view === viewType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView(viewType as 'day' | 'week' | 'month')}
                  className="capitalize"
                >
                  {viewType}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Time Slots */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Time Slots</CardTitle>
            <CardDescription>Available appointment times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="p-2 text-sm font-medium text-slate-600 bg-slate-50 rounded border-l-4 border-slate-200"
                >
                  {time}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
            <CardDescription>
              {appointments.length} appointments scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{appointment.patient}</h3>
                      <p className="text-sm text-slate-600">{appointment.type} • {appointment.doctor}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {appointment.time} ({appointment.duration} min)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        appointment.status === 'confirmed'
                          ? 'default'
                          : appointment.status === 'pending'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
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

export default Appointments;
