import { Component } from '@angular/core';
import { AddTaskComponent } from '../components/add-task.component';
import { TaskListComponent } from '../components/task-list.component';
import { LucideAngularModule, SquarePlus } from 'lucide-angular';
import { ModalComponent } from '../components/modal/modal.component';
import { NgIf } from '@angular/common';
import { AuthStoreService } from '../store/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AddTaskComponent,
    TaskListComponent,
    LucideAngularModule,
    ModalComponent,
    NgIf,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private authStore: AuthStoreService, private router: Router) {}

  onSignOut() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }

  readonly SquarePlus = SquarePlus;

  showAddModal = false;

  openAddTaskModal() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
  }

  saveTask() {
    this.showAddModal = false;
  }
}
