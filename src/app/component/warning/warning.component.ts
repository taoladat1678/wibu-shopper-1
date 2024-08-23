import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
