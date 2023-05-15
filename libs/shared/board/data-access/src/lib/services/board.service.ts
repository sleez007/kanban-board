import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../model';

@Injectable()
export class BoardService {
  constructor(private readonly http: HttpClient) {}

  getBoards(): Observable<IBoard[]> {
    const url = '/assets/images/data.json';
    return this.http.get<IBoard[]>(url);
  }
}
