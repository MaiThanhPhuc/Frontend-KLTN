export class OptionModel {
  text: string;
  id: any;
  checked = false;
  disabled?: boolean;
  tooltip?: string;

  constructor(text: string, id: any, checked = false, disabled?: boolean, tooltip?: string) {
    this.text = text;
    this.id = id;
    this.checked = checked;
    this.disabled = disabled;
    this.tooltip = tooltip;
  }
}
