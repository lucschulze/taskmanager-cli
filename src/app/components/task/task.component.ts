import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { TaskmanagerService } from 'src/app/service/taskmanager.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task: Task;
  
  constructor(
    private service: TaskmanagerService,
    ) {
     }

  ngOnInit(): void {
  }

  finalizar(){
    this.task.status = "FINALIZADA"
    this.service.finalizarTask(this.task).subscribe(
      (task: Task) => {
        this.service.emitChange("");
      }, (error: any) => {
        console.log( error);
      }
    )
  }

  excluir(){
    this.service.excluirTask(this.task).subscribe(
      (task: Task) => {
        this.service.emitChange("");
      }, (error: any) => {
        console.log( error);
      }
    )
  }
  atualizarTask(){
      this.service.emitChangeEdit(this.task);
      
  }

}
