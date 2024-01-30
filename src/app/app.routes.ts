import { Routes } from '@angular/router';
import { TeslaModelSelectorComponent } from './tesla-model-selector/tesla-model-selector.component';
import { RoutingConstants } from './routing/routing-constants';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { canActivateOptionsSelectionGuard } from './routing/can-activate-options-selection.guard';

export const routes: Routes = [
    {
        path: RoutingConstants.getTeslaModelSelectorPagePath(),
        component: TeslaModelSelectorComponent
    },
    {
        path: RoutingConstants.getTeslaOptionsSelectorPagePath(),
        loadComponent: () => import('./tesla-options-selector/tesla-options-selector.component'),
        canActivate: [canActivateOptionsSelectionGuard]
    },
    {
        path: RoutingConstants.getTelsaConfigurationSummaryPagePath(),
        loadComponent: () => import('./tesla-configuration-summary/tesla-configuration-summary.component')
    },
    {
        path: '',
        redirectTo: RoutingConstants.getTeslaModelSelectorPagePath(),
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },

];
