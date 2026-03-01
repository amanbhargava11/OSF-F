export type ProjectStage = 'Discovery' | 'Design' | 'Development' | 'Review' | 'Launch';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  company?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string | Date;
}

export interface Project {
  id: string;
  clientId: string | Partial<User>;
  title: string;
  description: string;
  stage: ProjectStage;
  progressPercent: number; // 0-100
  milestoneDate?: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'admin';
  text: string;
  isSystem?: boolean;
  createdAt: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  size: string;
  uploadedBy: string;
  createdAt: string;
  url: string;
}

export interface ActivityLog {
  id: string;
  projectId: string;
  type: 'stage_change' | 'file_upload' | 'message' | 'auth';
  content: string;
  timestamp: string;
}