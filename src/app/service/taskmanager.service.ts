import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Task } from '../model/task.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class TaskmanagerService {
  url = `http://localhost:3000/tasks`;

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  private emitChangeSourceEdit = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  changeEmittedEdit$ = this.emitChangeSourceEdit.asObservable();

    constructor(private httpClient: HttpClient) {}

    public listarTasks(): Observable<Task[]> {
          return this.httpClient.get<Task[]>(this.url);
        }

        public criarTask(request: any): Observable<Task> {
          return this.httpClient.post<Task>(this.url, request);
        }

        public editarTask(task: Task): Observable<Task> {
          const url = `${this.url}`;
          return this.httpClient.put<Task>(url, task);
        }

        public finalizarTask(task: Task): Observable<Task> {
          const url = `${this.url}/${task.id}`;
          return this.httpClient.put<Task>(url, task);
        }

        public excluirTask(task: Task): Observable<Task> {
          const url = `${this.url}/${task.id}`;
          return this.httpClient.delete<Task>(url);
        }

      emitChange(change: any) {
          this.emitChangeSource.next(change);
      }
      emitChangeEdit(change: any) {
        this.emitChangeSourceEdit.next(change);
    }

}