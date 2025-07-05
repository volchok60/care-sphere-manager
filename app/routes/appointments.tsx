
import { useState, useEffect } from "react";
import { useAuth } from "~/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BookAppointmentDialog } from "@/components/BookAppointmentDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router";

interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string | null;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  duration_minutes: number;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function Appointments() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        return;
      }

      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleAppointmentBooked = () => {
    fetchAppointments();
  };

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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your clinic appointments and schedule</p>
        </div>
        <BookAppointmentDialog onAppointmentBooked={handleAppointmentBooked} />
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

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Appointments
          </CardTitle>
          <CardDescription>
            {loadingAppointments ? 'Loading appointments...' : `${appointments.length} appointments found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingAppointments ? (
            <div className="flex justify-center py-8">
              <div>Loading appointments...</div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No appointments scheduled yet.</p>
              <BookAppointmentDialog onAppointmentBooked={handleAppointmentBooked} />
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border-l-4 border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{appointment.patient_name}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.appointment_type} • {appointment.doctor_name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(appointment.appointment_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {appointment.appointment_time} ({appointment.duration_minutes} min)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusVariant(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
