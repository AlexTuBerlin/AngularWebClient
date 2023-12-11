import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  users: any[] = [];
  error: string = '';
  posts: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data) => {
      this.posts = data;
      console.log('Received data:', this.posts);
    });
  }

  getData() {
    this.dataService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.error = ''; // Clear any previous error
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  title = 'AngularWebClient';
}
