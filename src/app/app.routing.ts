import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'usuario', 
        loadChildren: () => import('./views/usuario/usuario.module').then(m => m.UsuarioModule)
      },
      { path: 'categoria', 
        loadChildren: () => import('./views/categoria/categoria.module').then(m => m.CategoriaModule) 
      },
      { path: 'proveedor', 
      loadChildren: () => import('./views/proveedor/proveedor.module').then(m => m.ProveedorModule) 
      },
      { path: 'marca', 
        loadChildren: () => import('./views/marca/marca.module').then(m => m.MarcaModule) 
      },
      { path: 'tipodocumento', 
        loadChildren: () => import('./views/tipodocumento/tipodocumento.module').then(m => m.TipodocumentoModule) 
      },
      { path: 'producto', 
      loadChildren: () => import('./views/producto/producto.module').then(m => m.ProductoModule) },
      { path: 'bodega', 
        loadChildren: () => import('./views/bodega/bodega.module').then(m => m.BodegaModule) },
      { path: 'inventario', 
        loadChildren: () => import('./views/inventario/inventario.module').then(m => m.InventarioModule) },
      { path: 'cliente', 
        loadChildren: () => import('./views/cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'perfil', 
        loadChildren: () => import('./views/perfil/perfil.module').then(m => m.PerfilModule) },
      { path: 'transaccionesinventario', 
        loadChildren: () => import('./views/transaccionesinventario/transaccionesinventario.module').then(m => m.TransaccionesinventarioModule) },
      { path: 'debitoscaja', 
        loadChildren: () => import('./views/debitoscaja/debitoscaja.module').then(m => m.DebitoscajaModule) },
      { path: 'creditoscaja', 
        loadChildren: () => import('./views/creditoscaja/creditoscaja.module').then(m => m.CreditoscajaModule) },
      { path: 'cierrecaja', 
        loadChildren: () => import('./views/cierrecaja/cierrecaja.module').then(m => m.CierrecajaModule) }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
