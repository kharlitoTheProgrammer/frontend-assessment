import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { LucideAngularModule, Trash2, Edit, CircleCheck } from 'lucide-angular';
import { ModalComponent } from './modal/modal.component';
import { AddTaskComponent } from './add-task.component';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    LucideAngularModule,
    ModalComponent,
    AddTaskComponent,
  ],
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  readonly Trash = Trash2;
  readonly Check = CircleCheck;
  readonly Edit = Edit;

  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  confirmDelete = false;
  confirmMarkAsDone = false;
  showEditModal = false;
  taskIdToDelete: number | null = null;
  taskIdToMarkDone: number | null = null;
  taskTitleToDelete: string | null = null;
  taskTitleToMarkDone: string | null = null;
  editTaskData: Task | null = null;

  showEdit(task: Task) {
    this.editTaskData = { ...task };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editTaskData = null;
  }

  handleEditConfirm(updatedTask: Task) {
    this.taskService.updateTask(updatedTask);
    this.closeEditModal();
  }

  showDeleteConfirm(task: Task) {
    this.taskIdToDelete = task.id;
    this.taskTitleToDelete = task.title;
    this.confirmDelete = true;
  }

  showMarkAsDoneConfirm(task: Task) {
    this.taskIdToMarkDone = task.id;
    this.taskTitleToMarkDone = task.title;
    this.confirmMarkAsDone = true;
  }

  handleDeleteConfirm() {
    if (this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete);
    }
    this.confirmDelete = false;
    this.taskIdToDelete = null;
  }

  handleMarkAsDoneConfirm() {
    if (this.taskIdToMarkDone !== null) {
      this.taskService.markAsDone(this.taskIdToMarkDone);
    }
    this.confirmMarkAsDone = false;
    this.taskIdToMarkDone = null;
  }

  closeModal() {
    this.confirmDelete = false;
  }

  closeMarkAsDone() {
    this.confirmMarkAsDone = false;
  }

  markAsDone(id: number) {
    this.taskService.markAsDone(id);
  }

  deleteTask(task: Task) {
    if (confirm(`Are you sure you want to delete ${task.title}?`)) {
      this.taskService.deleteTask(task.id);
    }
  }
}
