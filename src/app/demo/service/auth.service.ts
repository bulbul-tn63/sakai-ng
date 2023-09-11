import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/_shared/localstorage.service';
import { environment } from 'src/environments/environment';
import { LoginRequest, User } from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatusSubject: BehaviorSubject<boolean>;
  loginStatusSubject$: Observable<boolean>;
  currentUser$: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  unsubscribe: Subscription[] = [];
  clearTimeout: any;

  baseUrl = environment.baseUrl+'/api/auth';

  constructor(
    private http: HttpClient,
    private router : Router,
    private localstorageService: LocalstorageService
    ) { }


    public login(formData:LoginRequest): Observable<Object>{
      console.log("On Authservice"+formData)
      return this.http.post(`${this.baseUrl}`+'/signin', formData);
    }
}
