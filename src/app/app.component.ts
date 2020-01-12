import { Component } from '@angular/core';
import { TaskService } from "../service/task.service";
import { all } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  priority = ["High", "Medium", "Low"];
  status = ["Pending", "In Process", "Completed"];
  taskObject = {
    "id": '',
    "taskName": '',
    "taskPriority": '',
    "taskDescription": '',
    "taskDate": '',
    "taskStatus": ''
  }

  constructor( private taskService: TaskService) {
    // this.completedPercentage();
  }
  addNewTask() {
    if(this.taskObject.id == '') {
      this.taskService.addTask(this.taskObject);
      this.completedPercentage();
    } else {
      const allTask = this.taskService.getTasks();
      const index = allTask.findIndex(i => i.id == this.taskObject.id)
      allTask[index] = this.taskObject;
      this.taskService.setLocalStorageTask(allTask);
    }

  }
  removeTask(id: number) {
    this.taskService.removeTask(id);
    this.completedPercentage();
  }
  completedPercentage() {
    const totalTask = this.taskService.getTasks();
    let completed =  0;
    totalTask.forEach(element => {
      if(element.taskStatus == "Completed") {
        completed = completed + 1;
      }
    });
    return ((completed*100)/totalTask.length) > 0 ? ((completed*100)/totalTask.length) : 0
  }
  __filter(value) {
      return this.taskService.getTasks().filter(i => i.taskStatus.indexOf(value) !== -1)
  }
  editTask(id) {
    this.taskObject = this.taskService.getTasks().find(i => i.id == id);
    document.getElementById('dialogBtn').click();
  }
  editStatus(id, status) {
    const allTask = this.taskService.getTasks();
    const index = allTask.findIndex(i => i.id == id);
    allTask[index].taskStatus = status;
    this.taskService.setLocalStorageTask(allTask)
  }

  getColor(value){
    if(value > 66) {
      return 'green'
    } else if(value > 33 && value < 66) {
      return 'blue'
    } else {
      return 'red'
    }
  }
}
