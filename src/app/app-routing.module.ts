import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/product-catalog',
      pathMatch: 'full'
    },
    {
        path: 'product-catalog',
        component: ProductCatalogComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }