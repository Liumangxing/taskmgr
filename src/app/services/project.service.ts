import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) { }

  //POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(project), { headers: this.headers })
      .pipe(
        map((res: Project) => res)
      );
  }

  //PUT
  update(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(
        map((res: Project) => res)
      );
  }

  //DELETE
  del(project: Project): Observable<Project> {
    const delTasks$: Observable<any> = from(project.taskLists)
      .pipe(
        mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)),
        count()
      );
    return delTasks$.pipe(
      switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)),
      mapTo(project)
    );
  }

  //GET
  getProjects(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'members_like': userId } })
      .pipe(
        map((res: Project[]) => res)
      );
  }

}
