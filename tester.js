let assert = require('assert')
let stringParser = require('./stringParser');

let testObj = stringParser.mix('Are they here','yes, they are here');

assert(testObj == "2:eeeee/2:yy/=:hh/=:rr", `Did not match ${testObj}`);