import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  private accountService = inject(AccountService);
  
  title = 'Dating App';

  ngOnInit(): void {
    
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userLocal = localStorage.getItem('user');
    if(userLocal)
    {
      const user = JSON.parse(userLocal);
      this.accountService.currrentUser.set(user);
    }
  }


}
