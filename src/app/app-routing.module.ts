import { SearchClientComponent } from './search-client/search-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClosureComponent } from './pages/closure/closure.component';
import { AuthGuard } from './@auth/@guard/auth.guard';
import { CifGuard } from './@auth/@guard/cif.guard';
import { RoutesEnum } from './@shared/routes.enum';
import { ClaimoverviewComponent } from './pages/claimoverview/claimoverview.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { DeclarationComponent } from './pages/declaration/declaration.component';
import { ExtensionComponent } from './pages/extension/extension.component';


const routes: Routes = [
  {
    path: `${RoutesEnum.SEARCH}`  ,
    component: SearchClientComponent,
    canActivate: [AuthGuard],
  },
  { path: `${RoutesEnum.OVERVIEW}`,
    component : ClaimoverviewComponent,
    canActivate: [AuthGuard, CifGuard]
  },
  { path: `${RoutesEnum.CONSULT}`,
    component : ConsultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesEnum.EXTENSION}` ,
    component: ExtensionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesEnum.DECLARATION}` ,
    component: DeclarationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutesEnum.CLOSURE}` ,
    component: ClosureComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: `${RoutesEnum.SEARCH}`,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: `${RoutesEnum.SEARCH}`,
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


