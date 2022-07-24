import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
  * opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: name,
        description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
  * opens the user director dialog from DirectorComponent to displaying details
  * @param name
  * @param bio
  * @param birthday
  */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name: name,
        bio: bio,
        birth: birth,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title: title,
        description: description,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * gets the current logged in user's data
   * @function getUserProfile
   * @returns the current logged in user's data
   */
   getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((res: any) => {
      console.log(res)
      const currentUser = res.username
      console.log(currentUser)
      const currentFavs = res.FavoriteMovies
      console.log(currentFavs)
    });
  }

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id 
   * @function addFavoriteMovie
   */
  addToFavoriteMovies(id: string, title: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    this.fetchApiData.addFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(`Successfully added ${title} to favorite movies.`, 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
      console.log(res)
      this.ngOnInit();
    });
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id 
   * @function removeFavoriteMovie
   */
  removeFromFavoriteMovies(id: string, title: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(`${title} has been removed from favorites`, 'OK', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.ngOnInit();
      console.log(res)
    });
    return this.getCurrentUser();
  }

}