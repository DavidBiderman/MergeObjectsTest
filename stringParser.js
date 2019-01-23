const clientApi = {};

const mix = (s1, s2) => {
    let obj1 = {};
    let obj2 = {};
    let replacer = /[A-Z\W*]/g;
    for (let letter of s1.replace(replacer, '')) {
        if (obj1[letter]) {
            obj1[letter]++;
        } else {
            obj1[letter] = 1;
        }
    }
    for (let letter of s2.replace(replacer, '')) {
        if (obj2[letter]) {
            obj2[letter]++;
        } else {
            obj2[letter] = 1;
        }
    }
    let valueArray = [];
    for (let key of Object.keys(obj2)) {
        if (obj2[key] > 1) {
            if (obj1[key] && obj1[key] > obj2[key]) {
                valueArray.push(createResultString('1', obj1[key], key));
            } else if (obj1[key] === obj2[key] && obj2[key] > 1) {
                valueArray.push(createResultString('=', obj1[key], key));
            } else {
                valueArray.push(createResultString('2', obj2[key], key));
            }
            delete obj1[key];
        }
    }
    for (let key of Object.keys(obj1)) {
        if (obj1[key] > 1) {
            valueArray.push(createResultString('1', obj1[key], key));
        }
    }
    return valueArray.sort((a, b) => sortByLengthThenByLexigraphical(a, b)).join('/');
}

const createResultString = (owner, value, key) => {
    return `${owner}:${key.repeat(value)}`;
}

const sortByLengthThenByLexigraphical = (a, b) => {
    if (b.length === a.length) {
        return b < a;
    } else {
        return b.length - a.length;
    }
}

clientApi.mix = mix;

module.exports = clientApi;