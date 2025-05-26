export class Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';

  constructor(
    id: number,
    title: string,
    description: string,
    status: 'pending' | 'completed'
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}
