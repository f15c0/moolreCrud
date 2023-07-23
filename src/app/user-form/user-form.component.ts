import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UserService } from '../services/user.service';
import { User } from '../user.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup; 
  user: User = { id: 0, name: '', email: '', password: '' };
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder 
  ) {}

  ngOnInit() {
    // Creating the userForm FormGroup and add form controls with validations
    this.userForm = this.formBuilder.group({
      id: [''], 
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });

    // Checking if the route has a user ID parameter (indicating editing mode)
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserDetails(parseInt(userId, 10)).subscribe({
        next:(data) => {
          this.user = data;
          this.userForm.patchValue(data); // Patch the retrieved user data to the form
        },
       error: (error) => {
          console.error('Error fetching user details:', error);
        }
    });
    }
  }

  handleFormSubmit() {
  if (this.userForm.controls['id'].value) {
    // If the userForm.controls['id'].value is truthy, it means we are in editing mode
    this.userService.updateUser(this.userForm.value).subscribe({
      next: (data) => {
        console.log('User updated:', data);
        this.router.navigate(['/users']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating user:', error);
        // Handle the error response and display appropriate notification to the user
        this.errorMessage = error.error['error'];
      }
    });
  } else {
    // If the userForm.controls['id'].value is falsy, it means we are in adding mode
    this.userService.addUser(this.userForm.value).subscribe({
      next: (data) => {
        console.log('User added:', data);
        this.router.navigate(['/users']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding user:', error);
        // Handle the error response and display appropriate notification to the user
        this.errorMessage = error.error['error'];
      }
    });
  }
}

}
