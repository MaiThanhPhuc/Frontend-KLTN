import { OptionModel } from "./models/optionsModel";

export class Constants {
  public static EmployeeStatus: OptionModel[] = [
    new OptionModel("Active", 0),
    new OptionModel("Deactive", 1)
  ]
}
