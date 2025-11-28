-- HR & Organizational Development Schema

-- 1. Organization Structure
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  manager_id UUID, -- Link to employee
  parent_department_id UUID REFERENCES departments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  level TEXT, -- e.g., Junior, Senior, Lead
  department_id UUID REFERENCES departments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Employee Profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  position_id UUID REFERENCES positions(id),
  department_id UUID REFERENCES departments(id),
  manager_id UUID REFERENCES employees(id),
  hire_date DATE,
  bio TEXT,
  skills TEXT[], -- Array of strings
  status TEXT DEFAULT 'active', -- active, on_leave, terminated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Performance Management
CREATE TABLE IF NOT EXISTS performance_cycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g., "Q1 2024 Review"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, active, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS performance_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id UUID REFERENCES performance_cycles(id),
  employee_id UUID REFERENCES employees(id),
  reviewer_id UUID REFERENCES employees(id),
  type TEXT NOT NULL, -- self, manager, peer
  status TEXT DEFAULT 'pending', -- pending, submitted, shared
  content JSONB, -- Flexible structure for answers
  rating NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, completed, cancelled
  progress INTEGER DEFAULT 0, -- 0-100
  due_date DATE,
  type TEXT DEFAULT 'individual', -- individual, department, company
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Development (IDP)
CREATE TABLE IF NOT EXISTS idp_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- course, mentorship, project, other
  linked_course_id UUID, -- Optional link to existing courses table
  status TEXT DEFAULT 'planned', -- planned, in_progress, completed
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Engagement
CREATE TABLE IF NOT EXISTS kudos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_employee_id UUID REFERENCES employees(id),
  to_employee_id UUID REFERENCES employees(id),
  message TEXT NOT NULL,
  category TEXT, -- e.g., "Teamwork", "Innovation"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Basic Draft)
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view basic employee info
CREATE POLICY "Employees are viewable by everyone" ON employees
  FOR SELECT USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON employees
  FOR UPDATE USING (auth.uid() = id);
