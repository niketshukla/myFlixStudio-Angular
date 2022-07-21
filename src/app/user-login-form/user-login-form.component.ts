import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * sending form inputs for user login to backend via fetchApiData Service
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // TBD: Logic for successfull login!
      this.dialogRef.close(); // Close the modal on success
      console.log(result);
      // // Add token and username to local Storage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.username);
      // Redirect to movies (main) page
      this.router.navigate(['movies']);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
} 