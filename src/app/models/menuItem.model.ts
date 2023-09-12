export class MenuItem {
  constructor(
    public id: string = "",
    public text: string = "",
    public url: string = "",
    public icon: string = "",
    // public controller: string = "",
    // public action: string = "",
    public isTitle: boolean = false,
  ) {
  }
  children: MenuItem[] = [];
}
