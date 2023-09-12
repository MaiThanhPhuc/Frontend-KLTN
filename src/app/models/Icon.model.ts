export class IconModel {
  icon: string;
  tooltip: string;
  cssClass: string;
  svg: boolean;
  isShow: boolean;
  constructor(icon: string, tooltip: string, cssClass = '', svg = false, isShow = true) {
      this.icon = icon;
      this.tooltip = tooltip;
      this.svg = svg;
      this.cssClass = cssClass;
      this.isShow = isShow;
  }
}
