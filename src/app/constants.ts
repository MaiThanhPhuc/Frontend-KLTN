import { OptionModel } from "./models/optionsModel";

export class Constants {
  public static EmployeeStatus: OptionModel[] = [
    new OptionModel("Active", 0),
    new OptionModel("Deactive", 1)
  ]

  public static Gender: OptionModel[] = [
    new OptionModel("Male", 0),
    new OptionModel("Female", 1)
  ]

  public static EmployeeRole: OptionModel[] = [
    new OptionModel("Human Resource", 0),
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

  public static LeaveTypeTimeOptions: OptionModel[] = [
    new OptionModel("All day", 0),
    new OptionModel("Morning shift (9:00 - 12:00)", 1),
    new OptionModel("Afternoon shift (13:00 - 18:00)", 2),
    new OptionModel("Half-Day Morning (9:00 - 14:00) (4 hours)", 3),
    new OptionModel("Half-Day Afternoon (14:00 - 18:00) (4 hours)", 4)
  ]

  public static LeaveRequestStatus: OptionModel[] = [
    new OptionModel("Cancelled", 0),
    new OptionModel("Pending", 1),
    new OptionModel("Approved", 2),
    new OptionModel("Waiting", 3)
  ]
}
