import { Injectable } from '@angular/core';
import { Task } from '../model/task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[];
  private nextId: number; 

  constructor() { 
    let tasks = this.getTasks();
    if(tasks.length > 0){
      this.nextId = tasks.length
    } else {
      this.nextId = 0;
    }
  }

  public getTasks(): Task[] {
    let localStorageItem = JSON.parse(localStorage.getItem("taskList"));
    return localStorage.getItem('taskList') == null ? [] : localStorageItem
  }

  public addTask(value): void {
    let task = new Task(this.nextId, value);
    let tasks = this.getTasks();
    tasks.push(task);
    this.setLocalStorageTask(tasks)
    this.nextId = this.nextId + 1;
  }
  public setLocalStorageTask(taskList: Task[]): void {
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }

  public removeTask(id) : void{
    let tasks = this.getTasks().filter((t) => t.id != id);
    this.setLocalStorageTask(tasks);
  }


}
