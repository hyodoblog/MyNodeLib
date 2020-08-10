export default class Spreadsheet {
  /**
   * Spreadsheet.connect: return a sheet fast
   * @param param SpreadsheetParams
   */
  public static connect(
    param: SpreadsheetParams = {}
  ): GoogleAppsScript.Spreadsheet.Sheet {
    let ss: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null
    if (param.fileId) {
      ss = SpreadsheetApp.openById(param.fileId)
    } else if (param.fileUrl) {
      ss = SpreadsheetApp.openByUrl(param.fileUrl)
    } else {
      ss = SpreadsheetApp.getActive()
    }
    if (ss) {
      if (param.sheetName) {
        const sheet = ss.getSheetByName(param.sheetName)
        if (sheet) {
          return sheet
        }
      }
      return ss.getActiveSheet()
    } else {
      throw new Error('Not found sheet')
    }
  }

  public spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  public sheet: GoogleAppsScript.Spreadsheet.Sheet
  public startRow: number
  public startCol: number

  constructor(param: SpreadsheetParams = {}) {
    this.spreadsheet = this.connectSpreadsheet(param)
    this.sheet = this.connectSheet(this.spreadsheet)
    this.startRow = param.startRow || 2
    this.startCol = param.startCol || 1
  }

  public insertData(data: Array<any>, dataLength: number = data.length): void {
    this.sheet.insertRowBefore(this.startRow)
    const range = this.getRange(dataLength)
    this.sheet.getRange(range).setValues([data])
  }

  private connectSpreadsheet(
    param: SpreadsheetParams = {}
  ): GoogleAppsScript.Spreadsheet.Spreadsheet {
    let ss: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null
    if (param.fileId) {
      ss = SpreadsheetApp.openById(param.fileId)
    } else if (param.fileUrl) {
      ss = SpreadsheetApp.openByUrl(param.fileUrl)
    } else {
      ss = SpreadsheetApp.getActive()
    }
    if (ss) {
      return ss
    } else {
      throw new Error('Not found sheet')
    }
  }

  private connectSheet(
    ss: GoogleAppsScript.Spreadsheet.Spreadsheet,
    param: SpreadsheetParams = {}
  ): GoogleAppsScript.Spreadsheet.Sheet {
    if (param.sheetName) {
      const sheet = ss.getSheetByName(param.sheetName)
      if (sheet) {
        return sheet
      }
    }
    return ss.getActiveSheet()
  }

  /**
   * make range etc.. A2:Z2
   */
  private getRange(dataLength: number): string {
    if (dataLength > 26) {
      throw new Error('There is a lot of data')
    } else {
      return `${this.int2alphabet(this.startCol - 1)}${String(
        this.startRow
      )}:${this.int2alphabet(dataLength - 1)}${String(this.startRow)}`
    }
  }

  private int2alphabet(n: number): string {
    const radix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const digit = radix.length
    return n.toString(digit).replace(/./g, (s: string) => {
      return radix[parseInt(s, digit)]
    })
  }
}

interface SpreadsheetParams {
  fileId?: string
  fileUrl?: string
  sheetName?: string
  startRow?: number
  startCol?: number
}
