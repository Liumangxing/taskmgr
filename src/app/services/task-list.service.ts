import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskList } from '../domain';
import { map, mapTo, concat, reduce } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskListService {

    private readonly domain = 'tasklists';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        @Inject('BASE_CONFIG') private config
    ) { }

    //POST
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.post(uri, JSON.stringify(taskList), { headers: this.headers })
            .pipe(
                map((res: TaskList) => res)
            );
    }

    //PUT
    update(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
        };
        return this.http.patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
            .pipe(
                map((res: TaskList) => res)
            );
    }

    //DELETE
    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http.delete(uri)
            .pipe(
                mapTo(taskList)
            );
    }

    //GET
    getTaskLists(): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri)
            .pipe(
                map((res: TaskList[]) => res)
            );
    }

    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
            .pipe(
                map(res => res)
            );
        const drop$ = this.http.patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
            .pipe(
                map(res => res)
            );
        return from([]).pipe(
            concat(drag$, drop$),
            reduce((arrs, list) => [...arrs, list], [])
        );
    }

}
