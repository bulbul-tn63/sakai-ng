import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Role, User,LoginRequest } from 'src/app/demo/api/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/_shared/localstorage.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    loginForm: FormGroup;
    public formData: LoginRequest;
    constructor(
        public layoutService: LayoutService,
        private fb:FormBuilder,
        private localstorageService:LocalstorageService,
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        if(this.localstorageService.isLoggedIn()){
            this.router.navigate(['/']);
          }
        this._initForm();
        this.loginForm.valueChanges.subscribe(data => {
            this.formData = data;
        })
    }

    get f() { return this.loginForm.controls; }

    // Initialize form function
  _initForm(){
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password: ['',[Validators.required]],
    });
  }
  
    onSubmit() {
      const formValues: LoginRequest = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      };
    
      if(this.loginForm.invalid){
        console.log("Invalid")
        return;
      }

      this.authService.login(formValues).subscribe({
        next : (v) => {
            this.setToken(v['token'],v['username']);
           //this.setObserver();
            this.router.navigate(['/'])
        },
        error : (e)=>{
            console.log(e.error.apiErrors[0].message)
        
        },
        complete: () => {this.router.navigate(['/'])}
      });
    }

    setObserver (){
        this.authService.loginStatusSubject.next(true);
        this.authService.currentUserSubject.next(this.localstorageService.getUser());
      }
    
    
      //set token and user
      setToken(token:string,username:string){
        this.localstorageService.setToken(token);
        this.localstorageService.setUser(username);
      }
  }
