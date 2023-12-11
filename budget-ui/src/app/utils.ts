
export class Utils {
  static toDateString(date : Date, plus: number = 0) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate() + plus;

// Generate yyyy-mm-dd date string
  return year + "-" + month + "-" + day;
  }
}
