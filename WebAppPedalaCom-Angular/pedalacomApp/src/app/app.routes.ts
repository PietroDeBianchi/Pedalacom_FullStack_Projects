import { Routes } from '@angular/router';
// NAVBAR ROUTES
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { CartComponent } from './features/cart/cart.component';
import { ContactsComponent } from './features/contacts/contacts.component';
// IN-PAGE ROUTES
import { ProductPageComponent } from './features/productPage/productpage.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AdminPanelComponent } from './admin/features/admin-panel/admin-panel.component';
import { AddProductsComponent } from './admin/models/add-products/add-products.component';
import { ManagementProductsComponent } from './admin/models/management-products/management-products.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
    // NAVBAR ROUTES
    {path: '', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'cart', component: CartComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'admin', component: AdminPanelComponent},
    {path: 'about', component: AboutComponent},
    // IN-PAGE ROUTES
    {path: 'product', component: ProductPageComponent},
    // QUERY PARAM
    {path: 'search/:searchParam', component: SearchComponent},
    {path: 'product/:productId', component: ProductPageComponent},

    // DEFAULT REDIRECT E 404 PAGE
    {path: '**', component: NotFoundComponent },
    {path:'', redirectTo: 'home', pathMatch: 'full'},
];
