-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT,
  doctor_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  appointment_type TEXT NOT NULL DEFAULT 'consultation',
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_date CHECK (appointment_date >= CURRENT_DATE),
  CONSTRAINT valid_time CHECK (appointment_time BETWEEN '08:00:00' AND '18:00:00')
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for appointments
CREATE POLICY "Users can view their own appointments" 
ON public.appointments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
ON public.appointments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appointments" 
ON public.appointments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();