CREATE DATABASE quickhire_db;
USE quickhire_db;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  salary VARCHAR(100),
  description TEXT NOT NULL,
  requirements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  resume_link VARCHAR(500) NOT NULL,
  cover_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO jobs (title, company, location, category, type, salary, description, requirements) VALUES
('Frontend Developer', 'TechCorp BD', 'Dhaka', 'Engineering', 'Full-time', '50k-80k BDT', 'We are looking for a skilled Frontend Developer...', 'React, Tailwind, 2+ years experience'),
('UI/UX Designer', 'Creative Studio', 'Chittagong', 'Design', 'Full-time', '40k-60k BDT', 'Join our design team to create beautiful interfaces...', 'Figma, Adobe XD, Portfolio required'),
('Backend Engineer', 'Startup Hub', 'Remote', 'Engineering', 'Remote', '60k-90k BDT', 'Build scalable backend systems...', 'Node.js, MySQL, REST API experience');