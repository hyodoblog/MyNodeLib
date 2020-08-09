import { createObjectCsvWriter } from 'csv-writer'
import * as csvSync from 'csv-parse/lib/sync'
import * as fs from 'fs'

export default class Csv {
  public static async exportObject(
    rows: Array<any>,
    header: Array<any>,
    path = `${__dirname}/../output.csv`
  ): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path,
      header,
      encoding: 'utf8',
      append: false,
    })

    await csvWriter.writeRecords(rows)
  }

  public static async exportArray(
    rows: Array<Array<any>>,
    header: Array<any>,
    path = `${__dirname}/../output.csv`
  ): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path,
      header,
      encoding: 'utf8',
      append: false,
    })

    await csvWriter.writeRecords(rows)
  }

  public static import(path: string): Array<Array<any>> {
    const buffer = fs.readFileSync(path)
    return csvSync(buffer)
  }
}
