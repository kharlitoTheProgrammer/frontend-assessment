import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { LucideAngularModule, SquarePlus, Save } from 'lucide-angular';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  readonly SquarePlus = SquarePlus;
  readonly Save = Save;

  get isEditMode(): boolean {
    return this.existingTask !== null;
  }

  get currentIcon() {
    return this.isEditMode ? this.Save : this.SquarePlus;
  }

  @Input() existingTask: Task | null = null;
  @Output() confirmEdit = new EventEmitter<Task>();
  @Output() submitted = new EventEmitter<void>();

  title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['existingTask']) {
      if (this.existingTask) {
        // When editing, fill inputs with existing task data
        this.title = this.existingTask.title;
        this.description = this.existingTask.description;
      } else {
        // When adding, clear inputs
        this.title = '';
        this.description = '';
      }
    }
  }

  addTask() {
    if (!this.title.trim() || this.description.length > 250) return;

    if (this.existingTask) {
      const updatedTask = {
        ...this.existingTask,
        title: this.title,
        description: this.description,
      };
      this.confirmEdit.emit(updatedTask);
    } else {
      this.taskService.addTask(this.title, this.description);
    }

    this.title = '';
    this.description = '';
    this.submitted.emit();
  }
}
