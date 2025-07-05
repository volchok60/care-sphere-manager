-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'doctor'));

-- Update existing profiles to have default role
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;

-- Make role column not null
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;