import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { AddTaskComponent } from '../add-task.component';
import { CircleCheck, LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, AddTaskComponent, LucideAngularModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  readonly Trash2 = Trash2;
  readonly CircleCheck = CircleCheck;
  @Input() deleteIcon = Trash2;
  @Input() title = '';
  @Input() show = false;
  @Input() confirmText: string = 'Confirm';
  @Input() showActions = true;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
