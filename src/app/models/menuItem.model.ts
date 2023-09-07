export class MenuItem {
  constructor(
      public id: string = "",
      public text: string = "",
      public url: string = "",
      public cssClass: string = "",
      public icon: string = "",
      public controller: string = "",
      public action: string = "",
      public isCheckPermission: boolean = false,
      public isNormalHref: boolean = false,
      public isIconHref: boolean = false) {
  }
  children: MenuItem[] = [];
}
