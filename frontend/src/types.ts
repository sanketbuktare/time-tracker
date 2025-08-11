export type ID = string;

export interface Task {
  id: ID;
  title: string;
  status: "todo" | "inprogress" | "done";
  projectId?: ID;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: ID;
  name: string;
  description?: string;
  Tasks?: Task[]; // optional when included by backend
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkSession {
  id: ID;
  taskId: ID;
  startedAt: string;
  stoppedAt?: string | null;
  durationSeconds?: number;
  createdAt?: string;
  updatedAt?: string;
}
