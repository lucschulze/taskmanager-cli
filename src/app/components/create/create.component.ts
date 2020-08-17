import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskmanagerService } from 'src/app/service/taskmanager.service';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formCadastro;
  sucesso: boolean = false;
  constructor(
    private service: TaskmanagerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.formCadastro = this.fb.group({
      titulo: [''],
      descricao: ['']
    });
  }

  cadastro(){

    this.service.criarTask(this.formCadastro.value).subscribe(
      (task: Task) => {
        this.sucesso = true;
        this.service.emitChange("");
      }, (error: any) => {
        console.log( error);
      }
    )
   }

}
