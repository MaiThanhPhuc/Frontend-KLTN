import { Constants } from "../constants";

const commonFunction = {
  getTextRole: getTextRole,
};

export default commonFunction;

function getTextRole(id: number) {
  return Constants.EmployeeRole.find(item => item.id === id)?.text
}
