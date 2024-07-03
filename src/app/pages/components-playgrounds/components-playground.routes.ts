import { Routes } from '@angular/router';
import { SelectPlaygroundComponent } from './select/select-playground.component';
import { ButtonPlaygroundComponent } from './button/button-playground.component';
import { CheckboxPlaygroundComponent } from './checkbox/checkbox-playground.component';
import { RadioPlaygroundComponent } from './radio/radio-playground.component';
import { TogglePlaygroundComponent } from './toggle/toggle-playground.component';
import { DialogPlaygroundComponent } from './dialog/dialog-playground.component';
import { TooltipPlaygroundComponent } from './tooltip/tooltip-playground.component';
import { TextareaPlaygroundComponent } from './textarea/textarea-playground.component';
import { InputPlaygroundComponent } from './input/input-playground.component';
import { DatepickerPlaygroundComponent } from './datepicker/datepicker-playground.component';
import { PlaygroundComponent } from './playground/playground.component';

export const PLAYGROUND_ROUTES: Routes = [
    { path: '', component: PlaygroundComponent },
    { path: 'select', component: SelectPlaygroundComponent },
    { path: 'checkbox', component: CheckboxPlaygroundComponent },
    { path: 'radio', component: RadioPlaygroundComponent },
    { path: 'button', component: ButtonPlaygroundComponent },
    { path: 'toggle', component: TogglePlaygroundComponent },
    { path: 'dialog', component: DialogPlaygroundComponent },
    { path: 'tooltip', component: TooltipPlaygroundComponent },
    { path: 'input', component: InputPlaygroundComponent },
    { path: 'textarea', component: TextareaPlaygroundComponent },
    { path: 'datepicker', component: DatepickerPlaygroundComponent },
];
