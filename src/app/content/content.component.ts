import { Component, OnInit } from '@angular/core';
import { TaskmanagerService } from '../service/taskmanager.service';
import { Task } from '../model/task.model';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  tasks: Task[];
  task: Task;
  formEditar;
  sucesso: boolean = false;

  constructor(
    private service: TaskmanagerService,
    private fb: FormBuilder) {
      service.changeEmitted$.subscribe(() => this.carregarDados());
      service.changeEmittedEdit$.subscribe((task: Task) => this.atualizarTask(task));
      this.formEditar = this.fb.group({
        id: [],
        titulo: [''],
        descricao: [''],
        status: ['']
      });
    }

  ngOnInit(): void {
    this.carregarDados();
  }
  carregarDados() {
    this.service.listarTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }, (error: any) => {
        console.log( error);
      }
    );
  }

  atualizarTask(task: Task) {
    this.sucesso = false;
    this.task = task;
   this.formEditar = this.fb.group({
    id: new FormControl(this.task.id),
    titulo: new FormControl(this.task.titulo),
    descricao: new FormControl(this.task.descricao),
    status: new FormControl(this.task.status)
  });
  }
 
  editarTask() {
    this.service.editarTask(this.formEditar.value).subscribe(
      (task: Task) => {
        this.sucesso = true;
        this.service.emitChange("");
      }, (error: any) => {
        console.log( error);
      }
    )

  }
}
