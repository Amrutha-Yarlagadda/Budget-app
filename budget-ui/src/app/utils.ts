
export class Utils {
  static toDateString(date : Date, plus: Number = 0) {
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" }) + plus;

// Generate yyyy-mm-dd date string
  return year + "-" + month + "-" + day;
  }
}
