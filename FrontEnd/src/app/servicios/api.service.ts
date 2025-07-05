import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(this.apiUrl + 'login/', { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'register/', { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Devuelve true si getToken() no es null o undefined
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return this.http.post(this.apiUrl + 'logout/', {}, { headers });
    }
    // Si no hay token, devuelve un observable que emite y completa inmediatamente.
    return of(null); // <-- Esto reemplaza el new Observable(...) problemático
  }

  getTareas(token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(this.apiUrl + 'tareas/', { headers });
  }
  addTarea(token: string, tarea: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(this.apiUrl + 'tareas/', tarea, { headers });
  }
  updateTarea(token: string, tarea: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(this.apiUrl + 'tareas/' + tarea.id_tarea + '/', tarea, { headers });
  }
  deleteTarea(token: string, id_tarea: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(this.apiUrl + 'tareas/' + id_tarea + '/', { headers });
  }
}