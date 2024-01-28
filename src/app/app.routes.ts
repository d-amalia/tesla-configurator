import { Routes } from '@angular/router';
import { TeslaModelSelectorComponent } from './tesla-model-selector/tesla-model-selector.component';
import { RoutingConstants } from './routing/routing-constants';

export const routes: Routes = [
    {
        path: RoutingConstants.getTeslaModelSelectorPagePath(),
        component: TeslaModelSelectorComponent
    },
    {
        path: RoutingConstants.getTeslaOptionsSelectorPagePath(),
        loadComponent: () => import('./tesla-options-selector/tesla-options-selector.component')
    }
];
