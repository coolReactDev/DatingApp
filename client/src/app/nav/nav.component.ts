import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule,BsDropdownModule, RouterLink,RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  router = inject(Router);
  accountService = inject(AccountService);
  toaster = inject(ToastrService)
  model: any={}
  logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
  login()
  {
    this.accountService.login(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: error => {
        console.log(error);
        this.toaster.error(error.error);
      }      
    })
    console.log(this.model);
  }
}
