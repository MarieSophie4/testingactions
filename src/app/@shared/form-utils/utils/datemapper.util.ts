/**
 * Can convert string to dates and dates to strings
 */
const dateMapper = {
  /** format a JS date object to the default dd/MM/yyyy format */
  format(d: Date): string {
    if (d instanceof Date) {
      const parts = [d.getFullYear(), `0${d.getMonth() + 1}`.slice(-2), `0${d.getDate()}`.slice(-2)];
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  },

  /**
   * @param reference date to use for the comparison
   * @param [timecheck=false] boolean indication if the comparison should be on date (yyy-mm-dd) level or including the time (hh:mm)
   * @returns 0 in case the dates are equal, -1 if the base if before the reference and 1 if it comes after
   */
   compare(base: Date, reference: Date, timecheck = false): number {
    let b = new Date(base).setSeconds(0, 0);
    let ref = new Date(reference).setSeconds(0, 0);
    if (!timecheck) {
      b = new Date(base).setHours(0, 0);
      ref = new Date(ref).setHours(0, 0);
    }
    if (b === ref) {
      return 0;
    }
    return b > ref ? 1 : -1;

  },

  /**
   * Makes a date object from a stringobject with / as divider
   * @param d the date in string format
   * @returns date object
   */
  fromString(d: string): Date {
    // protect against empty strings
    if (d && d.match(/\d{1,2}\/\d{1,2}\/\d{4}/g)) {
      const parts : string[] = d.split('/');
      const dateInput : Date = new Date(+parts[2], +parts[1] - 1, +parts[0], 12);
      const parsedNew : string[] = [`0${dateInput.getDate()}`.slice(-2),`0${dateInput.getMonth() + 1}`.slice(-2), (dateInput.getFullYear().toString())];
      if(`${parsedNew[2]}/${parsedNew[1]}/${parsedNew[0]}` !== `${parts[2]}/${parts[1]}/${parts[0]}` ){
        return null;
      }
      return new Date(+parts[2], +parts[1] - 1, +parts[0], 12);
    }
  }
}

/** DateMapper object that can be used to use the functionality */
export const dateMapperFunctionality : Readonly<typeof dateMapper> = dateMapper;
