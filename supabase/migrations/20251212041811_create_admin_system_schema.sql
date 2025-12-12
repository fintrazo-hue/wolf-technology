/*
  # Wolf Technologies Admin System Database Schema

  1. New Tables
    - `departments`
      - `id` (uuid, primary key)
      - `name` (text) - Department name (Accounts, Technical, Marketing)
      - `description` (text) - Department description
      - `created_at` (timestamptz)
    
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text) - admin, super_admin, employee
      - `avatar_url` (text)
      - `phone` (text)
      - `department_id` (uuid, foreign key)
      - `status` (text) - active, inactive
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `employees`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `employee_code` (text, unique)
      - `designation` (text)
      - `department_id` (uuid, foreign key)
      - `joining_date` (date)
      - `salary` (numeric)
      - `status` (text) - active, inactive, on_leave
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `leads`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `product` (text)
      - `source` (text) - website, referral, cold_call, etc.
      - `status` (text) - new, contacted, qualified, converted, lost
      - `assigned_to` (uuid, foreign key to users)
      - `department_id` (uuid, foreign key)
      - `priority` (text) - low, medium, high
      - `value` (numeric)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `message` (text)
      - `type` (text) - info, success, warning, error
      - `is_read` (boolean)
      - `link` (text)
      - `created_at` (timestamptz)
    
    - `activity_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `action` (text)
      - `entity_type` (text) - lead, employee, user, etc.
      - `entity_id` (uuid)
      - `details` (jsonb)
      - `ip_address` (text)
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_name` (text)
      - `product` (text)
      - `amount` (numeric)
      - `status` (text) - pending, completed, failed
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Super admin can access all data
    - Regular users can access their own data
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'employee',
  avatar_url text,
  phone text,
  department_id uuid REFERENCES departments(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  employee_code text UNIQUE NOT NULL,
  designation text NOT NULL,
  department_id uuid REFERENCES departments(id),
  joining_date date NOT NULL,
  salary numeric(10, 2),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text,
  phone text,
  company text,
  product text,
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  assigned_to uuid REFERENCES users(id),
  department_id uuid REFERENCES departments(id),
  priority text DEFAULT 'medium',
  value numeric(10, 2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  product text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for departments
CREATE POLICY "Authenticated users can view departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can insert departments"
  ON departments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can update departments"
  ON departments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

-- RLS Policies for users
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Super admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Super admins can update all users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

-- RLS Policies for employees
CREATE POLICY "Authenticated users can view employees"
  ON employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can delete employees"
  ON employees FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

-- RLS Policies for leads
CREATE POLICY "Users can view assigned leads"
  ON leads FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());

CREATE POLICY "Super admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can insert leads"
  ON leads FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Users can update their assigned leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (assigned_to = auth.uid())
  WITH CHECK (assigned_to = auth.uid());

CREATE POLICY "Super admins can update all leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications for users"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for activity_logs
CREATE POLICY "Users can view their own activity logs"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all activity logs"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

CREATE POLICY "System can insert activity logs"
  ON activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for orders
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can manage orders"
  ON orders FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'super_admin'
    )
  );

-- Insert default departments
INSERT INTO departments (name, description) VALUES
  ('Accounts', 'Financial and accounting operations'),
  ('Technical', 'Technical support and development'),
  ('Marketing', 'Marketing and sales operations')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_employees_user_id ON employees(user_id);
CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();