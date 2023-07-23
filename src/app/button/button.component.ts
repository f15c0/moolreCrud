import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

   handleFormSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    // Create an empty object to store form data
    const userData: any = {};

    // Loop through the form data and store it in the 'userData' object
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // Call 'handleAddUser' function with the form data
    this.handleAddUser(userData);
  }

  handleAddUser(userData: any) {
    console.log(userData);
  }
}




