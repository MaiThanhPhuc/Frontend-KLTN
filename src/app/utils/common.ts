import { Constants } from "../constants";

const commonFunction = {
  getTextRole: getTextRole,
  formatMMDDYYY: formatMMDDYYY,
  getTimeHHMMFormat: getTimeHHMMFormat,
};

export default commonFunction;

function getTextRole(id: number) {
  return Constants.EmployeeRole.find(item => item.id === id)?.text
}

function formatMMDDYYY(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

function getTimeHHMMFormat(date: Date): string {
  date = new Date(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${mins}`;
}
