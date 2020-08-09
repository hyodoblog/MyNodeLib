"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_writer_1 = require("csv-writer");
const csvSync = require("csv-parse/lib/sync");
const fs = require("fs");
class Csv {
    static async exportObject(rows, header, path = `${__dirname}/../output.csv`) {
        const csvWriter = csv_writer_1.createObjectCsvWriter({
            path,
            header,
            encoding: 'utf8',
            append: false,
        });
        await csvWriter.writeRecords(rows);
    }
    static async exportArray(rows, header, path = `${__dirname}/../output.csv`) {
        const csvWriter = csv_writer_1.createObjectCsvWriter({
            path,
            header,
            encoding: 'utf8',
            append: false,
        });
        await csvWriter.writeRecords(rows);
    }
    static import(path) {
        const buffer = fs.readFileSync(path);
        const res = csvSync(buffer);
        console.log(res.length);
        console.log(res[0]);
    }
}
exports.default = Csv;
//# sourceMappingURL=csv.js.map