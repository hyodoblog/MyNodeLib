"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
function test() {
    const path = `${__dirname}/../assets/初級.csv`;
    console.log(path);
    lib_1.csv.import(path);
}
test();
//# sourceMappingURL=test.js.map