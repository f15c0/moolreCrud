import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.interface'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fetch the user details from your backend API
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    // Get the userId from the route parameter
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      // Convert userId to a number (if needed)
      const userIdNumber = parseInt(userId, 10);

      // Use the dynamic userId received from the route parameter
      this.userService.getUserDetails(userIdNumber).subscribe({
        next:(data) => {
          // Update the user property with the received data
          this.user = data;
        },
        error:(error) => {
          console.error('Error fetching user details:', error);
        }
    });
    }
  }
}
