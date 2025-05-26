import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private idCounter = 1;

  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);
      this.tasks.next(parsedTasks);
      // Set idCounter to max existing id + 1
      this.idCounter =
        parsedTasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    }
  }

  private saveToStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTask(title: string, description: string) {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      description,
      status: 'pending',
    };
    const updatedTasks = [...this.tasks.value, newTask];
    this.tasks.next(updatedTasks);
    this.saveToStorage(updatedTasks);
  }

  updateTask(updatedTask: Task) {
    const updated = this.tasks.value.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasks.next(updated);
    this.saveToStorage(updated);
  }

  deleteTask(id: number) {
    const updated = this.tasks.value.filter((t) => t.id !== id);
    this.tasks.next(updated);
    this.saveToStorage(updated);
  }

  markAsDone(id: number) {
    const task = this.tasks.value.find((t) => t.id === id);
    if (!task) return;
    this.updateTask({ ...task, status: 'completed' });
  }
}
