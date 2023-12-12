import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngularWebClient';
  users: any[] = [];
  newUser: User = {name:'',vorname:'',email:''};
  errorMessage: string = '';
  userNameInput: string = '';
  sub: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.sub = this.dataService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err.message
    });
  }

  getUsersByName(user_name :string){
    this.sub = this.dataService.getUsersByName(user_name).subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err.message
    });
  }

  addUser(user: User){
    this.sub = this.dataService.addUser(user).subscribe({
      next: users => {
        this.users = users;    
        this.getUsers()
      },
      error: err => this.errorMessage = err.message
    });
  }
}
