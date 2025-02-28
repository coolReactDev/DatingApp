import { Component, inject, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterModel } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model : RegisterModel = {userName : '',password : ''}
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);
  toast = inject(ToastrService);
  register()
  {
    this.accountService.register(this.model).subscribe(
    {
      next: response => {
        console.log(response)
        this.cancel();
      },
      error: er => {console.log(er);
        this.toast.error(er.error)
      }
    });
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
