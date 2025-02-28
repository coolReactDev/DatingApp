import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './lists/list/list.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'members', component: MemberListComponent , canActivate:[authGuard]},
    {path: 'members/:id', component: MemberListComponent , canActivate:[authGuard]},
    {path: 'lists', component: ListComponent , canActivate:[authGuard]},
    {path: 'messages', component: MessagesComponent , canActivate:[authGuard]},
    {path: '**', component: HomeComponent,pathMatch:'full'},
];
