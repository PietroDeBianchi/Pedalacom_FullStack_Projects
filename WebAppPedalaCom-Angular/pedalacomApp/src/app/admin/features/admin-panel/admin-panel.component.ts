import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AddProductsComponent } from '../../models/add-products/add-products.component';
import { PanelManagerService } from '../../shared/services/panel-manager.service';
import { CommonModule } from '@angular/common';
import { ManagementProductsComponent } from '../../models/management-products/management-products.component';
import { EditProductComponent } from '../../models/edit-product/edit-product.component';
import { DeleteUserComponent } from '../../models/delete-user/delete-user.component';
import { ViewLogComponent } from '../../models/view-log/view-log.component';
import { ViewErrorComponent } from '../../models/view-error/view-error.component';
import { Router, RouterModule } from '@angular/router';


@Component({
	selector: 'app-admin-panel',
	standalone: true,
	imports: [AddProductsComponent, ManagementProductsComponent, RouterOutlet, RouterLink, CommonModule,EditProductComponent,DeleteUserComponent,
	ViewLogComponent, ViewErrorComponent, RouterModule],
	templateUrl: './admin-panel.component.html',
	styleUrl: './admin-panel.component.scss',
	providers: [PanelManagerService]
})
export class AdminPanelComponent {
	stringPage = "";

	constructor(
		private mainService: PanelManagerService, 
		private router: Router
	) { }

	ngOnInit(){
		this.redirect()
	}

	redirect(){
		if(localStorage.getItem("authorization") != btoa('Admin') && sessionStorage.getItem("authorization") != btoa('Admin')){
		  this.router.navigate(['**']);
		}
	  }

	insertPanel(action: string) {
		this.mainService.setAction(action)
	}

}