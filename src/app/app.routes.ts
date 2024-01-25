import { Routes } from '@angular/router';

//import { ListComponent } from './domains/products/pages/list/list.component'
import { LayoutComponent } from '@shared/components/layout/layout.component'
//import { AboutComponent } from './domains/info/pages/about/about.component'
//import { ProductDetailComponent } from './domains/products/pages/product-detail/product-detail.component'
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component'

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                //Esto es para cargar un componente cuando el ususario lo este utilizando asi que lo importamos y lo hacemos 
                //de manera asyncrona porque no sabes cuando se usara podemos usar el then p el defaul en la clase que sde utiliza
                loadComponent: ()=>  import('./domains/products/pages/list/list.component')
            },
            {
                path: 'about',
                loadComponent:() => import('./domains/info/pages/about/about.component')
            },
            {
                path: 'product/:id',
                loadComponent:()=> import('./domains/products/pages/product-detail/product-detail.component')
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
