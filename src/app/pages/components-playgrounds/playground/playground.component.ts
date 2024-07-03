import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button-comp/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['../../../shared/scss/components/_playgrounds.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  components: any[] = [
    {
      label: 'Select',
      icon: '../../../../assets/icons/components-types/dropdown-list.svg',
      link: '/playground/select',
    },
    {
      label: 'Checkbox',
      icon: '../../../../assets/icons/components-types/checkbox-line.svg',
      link: '/playground/checkbox',
    },
    {
      label: 'Radio',
      icon: '../../../../assets/icons/components-types/list-radio.svg',
      link: '/playground/radio',
    },
    {
      label: 'Button',
      icon: '../../../../assets/icons/components-types/button.png',
      link: '/playground/button',
    },
    {
      label: 'Toggle',
      icon: '../../../../assets/icons/components-types/toggle-line.svg',
      link: '/playground/toggle',
    },
    {
      label: 'Dialog',
      icon: '../../../../assets/icons/components-types/message-3-line.svg',
      link: '/playground/dialog',
    },
    {
      label: 'Tooltip',
      icon: '../../../../assets/icons/components-types/information-2-line.svg',
      link: '/playground/tooltip',
    },
    {
      label: 'Input',
      icon: '../../../../assets/icons/components-types/input-field.svg',
      link: '/playground/input',
    },
    {
      label: 'Text Area',
      icon: '../../../../assets/icons/components-types/text-block.svg',
      link: '/playground/textarea',
    },
    {
      label: 'Date Picker',
      icon: '../../../../assets/icons/components-types/calendar-2-line.svg',
      link: '/playground/datepicker',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(link: string): void {
    this.router.navigate([link]);
  }
}
