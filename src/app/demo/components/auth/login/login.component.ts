import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Role, User } from 'src/app/demo/api/user';

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
    password: string = '';
    email:string = '';
    constructor(public layoutService: LayoutService) {}
  
    onSubmit() {
      // Access form values from component properties
      const emailValue = this.email;
      const passwordValue = this.password;
  
      console.log('Form submitted with values:');
      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);
  
      // You can access and use other form values to set properties of this.user as needed
  
      // Example: Set a role for the user
      
    }
  }
