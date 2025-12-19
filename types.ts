
export type Priority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Project' | 'Study' | 'Work' | 'Freelance';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export type JobStatus = 'Applied' | 'Interview' | 'Rejected' | 'Approved' | 'Follow-up';
export type JobType = 'Remote' | 'Hybrid' | 'On-site';

export interface Job {
  id: string;
  company: string;
  role: string;
  stack: string[];
  type: JobType;
  status: JobStatus;
  notes: string;
  appliedDate: string;
  interviewDate?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isPremium: boolean;
  avatar: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  type: 'Interview' | 'Deadline' | 'Study' | 'Meeting';
  relatedId?: string;
}
