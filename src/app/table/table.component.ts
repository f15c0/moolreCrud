import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.interface'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Fetch the actual data from your backend API
    this.fetchUsers();
  }

  fetchUsers() {
  this.userService.getUsers().subscribe({
    next: (data) => {
      // Updating the users array with the data received from the API
      this.users = data;
    },
    error: (error) => {
      console.error('Error fetching users:', error);
    }
  });
}


  onEdit(user: User) {

     // Navigate to the UserEditComponent with the user's ID as a parameter
    this.router.navigate(['/users/edit', user.id]);
  }

  onDelete(user: User) {
    // Implement the delete functionality here
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
       next: () => {
          // If the deletion is successful, remove the user from the users array
          this.users = this.users.filter((u) => u.id !== user.id);
          console.log('User deleted:', user.id);
        },
      error:  (error) => {
          console.error('Error deleting user:', error);
        }
    });
    }
  }

   onView(user: User) {
    
     // Navigate to the UserDetailsComponent with the user's ID as a parameter
  this.router.navigate(['/users/user-details', user.id]);
    
  }
}
