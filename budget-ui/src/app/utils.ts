
export class Utils {
  static toDateString(date : Date) {
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
  return year + "-" + month + "-" + day;
  }
}
