import { BaseModel } from './base.model';

export class Task extends BaseModel {
  
  constructor(task: Partial<Task>) {
    super(task);
    this.title = task.title || "";
    this.description = task.description || "";
    this.createdAt = task.createdAt || new Date();
    this.dueAt = task.dueAt;
    this.progress = task.progress || 0;
    this.tags = task.tags?.filter(v => !!v) || [];
    this.columnId = task.columnId;
  }

  columnId?: string | null;
  title?: string | null;
  description?: string | null;
  dueAt?: Date | null;
  progress: number = 0;
  tags: Array<string | null> = [];
}