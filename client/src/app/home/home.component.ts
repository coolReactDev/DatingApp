import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  accountService = inject(AccountService)
  http = inject(HttpClient)
  users : any;
  ngOnInit(): void {
    this.getAllUsers();
  }
  
  registerMode: boolean = false;
  
  cancelRegister(event: boolean)
  {
    this.registerMode = event;
  }

  registerToggle()
  {
    this.registerMode = ! this.registerMode;
  }

  private getAllUsers() {
    this.http.get('https://localhost:7289/api/Users').subscribe({
      next: Response => { this.users = Response; },
      error: error => { console.log(error); },
      complete: () => { console.log('Complete'); }
    });
  }

}
