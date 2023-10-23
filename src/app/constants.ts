import { OptionModel } from "./models/optionsModel";

export class Constants {
  public static EmployeeStatus: OptionModel[] = [
    new OptionModel("Active", 0),
    new OptionModel("Deactive", 1)
  ]

  public static EmployeeRole: OptionModel[] = [
    new OptionModel("Admin", 0),
    new OptionModel("Manager", 1),
    new OptionModel("Leader", 2),
    new OptionModel("Member", 3)
  ]
  public static AdminRole = new OptionModel("Admin", 0)
  public static ManagerRole = new OptionModel("Manager", 1)
  public static LeaderRole = new OptionModel("Leader", 2)
  public static MemberRole = new OptionModel("Member", 3)

  public static ActiveStatus = new OptionModel("Active", 0)
  public static DeactiveStatus = new OptionModel("Deactive", 1)
}
