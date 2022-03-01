import { Observable } from "rxjs";

export interface CrudInterface<T> {
  findAll(): Observable<T[]>;
  findOne(id: number): Observable<T>;
  add(t: T): Observable<T>;
  update(t: T): void;
  remove(t: T): void;
}
