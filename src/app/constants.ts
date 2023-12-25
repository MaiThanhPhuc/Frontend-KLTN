import { OptionModel } from "./models/optionsModel";

export class Constants {
  public static EmployeeStatus: OptionModel[] = [
    new OptionModel("Active", 1),
    new OptionModel("Deactive", 0)
  ]

  public static Gender: OptionModel[] = [
    new OptionModel("Male", "Male"),
    new OptionModel("Female", "Female")
  ]

  public static EmployeeRole: OptionModel[] = [
    new OptionModel("Human Resource", 1),
    new OptionModel("Manager", 2),
    new OptionModel("Leader", 3),
    new OptionModel("Member", 4)
  ]

  public static EmployeePermission: OptionModel[] = [
    new OptionModel("admin", 0),
    new OptionModel("humanResource", 1),
    new OptionModel("manager", 2),
    new OptionModel("leader", 3),
    new OptionModel("member", 4)
  ]
  public static AdminRole = new OptionModel("Admin", 0)
  public static HrRole = new OptionModel("Human Resource", 1)
  public static ManagerRole = new OptionModel("Manager", 2)
  public static LeaderRole = new OptionModel("Leader", 3)
  public static MemberRole = new OptionModel("Member", 4)

  public static ActiveStatus = new OptionModel("Active", 1)
  public static DeactiveStatus = new OptionModel("Deactive", 0)

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
    new OptionModel("Waiting", 3),
    new OptionModel("Reject", 4)
  ]

  public static LeaveRequestStatusOptions: OptionModel[] = [
    new OptionModel("Approved", 2),
    new OptionModel("Reject", 4)
  ]

  public static LeaveRequestCancelOption = new OptionModel("Cancel", 0)

}
