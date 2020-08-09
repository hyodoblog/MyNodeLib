import { csv } from './lib'

function test(): void {
  const path = `${__dirname}/../assets/初級.csv`
  console.log(path)
  csv.import(path)
}

test()
