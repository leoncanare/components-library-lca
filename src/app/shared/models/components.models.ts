export interface Palete {
  component_text: string;
  component_btn: string;
  component_principal: string;
  component_action: string;
  component_action_border: string;
  component_action_border2: string;
  component_action_sdw: string;
  component_border: string;
  component_scrollbar: string;
  component_hr: string;
  component_hover: string;
  component_principal_hover: string;
  component_action_principal: string;
  component_active: string;
  component_link: string;
  component_ok: string;

  component_shadow_contrast: string;
  component_shadow_contrast_2: string;

  component_grey: string;
  component_grey_soft: string;
  component_grey_soft_2: string;

  component_error: string;
  component_error_2: string;

  component_btn_filter: string;
  component_principal_filter: string;
  component_active_filter: string;
  component_border_filter: string;
  component_action_border2_filter: string;
  component_shadow_contrast_filter: string;
  component_grey_filter: string;
  component_grey_soft_filter: string;
}

export interface CheckboxOption {
  label: string;
  value: unknown;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  link?: { url: string; label: string };
}

export interface RadioOption {
  label: string;
  value: unknown;
  checked?: boolean;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: any;
  description?: string;
  attributes?: any;
  checked?: boolean;
  disabled?: boolean;
}
