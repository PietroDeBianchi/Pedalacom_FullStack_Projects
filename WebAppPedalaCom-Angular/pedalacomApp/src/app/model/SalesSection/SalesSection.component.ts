import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-saleSection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './SalesSection.component.html',
  styleUrls: ['./SalesSection.component.scss']
})
export class SalesSectionComponent {
  
}

