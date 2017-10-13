/**
 * Created by Cooper on 2017/10/13.
 */
const _ = require('lodash');


let m = {a: 2, b: 4, c: 1, d: 4},
    n = {a: 2, '1': 4, '2': 1, d: 4},
    o,
    p = [{a: 3, b: 2}, {a: 4, c: 1}, {a: 4, c: 1}],
    r = [1, 2, 4, 7],
    s = [1, 2, 4, 8],
    t = [{order: "a123456", price: 123, title: "test"}, {order: "a123457", price: 124}],
    u = [{order: "a123456", price: 125}];


// sort keys by values
o = _.fromPairs(_.sortBy(_.toPairs(m), [e => -e[1]]));
// { b: 4, d: 4, a: 2, c: 1 }
o = _.fromPairs(_.sortBy(_.toPairs(m), [e => e[1]]));
// { c: 1, a: 2, b: 4, d: 4 }

o = _.fromPairs(_.sortBy(_.toPairs(n), [e => -e[1]]));
// { '1': 4, '2': 1, d: 4, a: 2 } todo strange ???
o = _.sortBy(_.map(n, (v, k) => {return {k, v}}), e => -e.v);
// [ { k: '1', v: 4 },{ k: 'd', v: 4 },{ k: 'a', v: 2 },{ k: '2', v: 1 } ]


// add value if elements have same key
o = _.reduce((_.uniq(_.flattenDeep(_.map(p, e => _.keys(e))))), (s, v) => {
    s[v] = _.sumBy(p, o => o[v]);
    return s
}, {});
// { a: 11, b: 2, c: 2 }


// decrease
o = _.map(r, (e, i) => r[i + 1] - e).slice(0, -1);
// [ 1, 2, 3 ]


// get last element
o = r.slice(-1)[0];
// 7


// correlation coefficient
function correl(x, y) {
    xxs = _.sumBy(x, v => v * v);
    yys = _.sumBy(y, v => v * v);
    xys = _.sumBy(x, v => v * y[x.indexOf(v)]);
    xs = _.sum(x);
    ys = _.sum(y);
    n = x.length;
    return (n * xys - xs * ys) / Math.sqrt(n * xxs - xs * xs) / Math.sqrt(n * yys - ys * ys)
}
o = correl(r, s);
// 0.9970972362566877


// merge elements by specific key in two arrays
o = function () {
    let result = [];
    _.forEach(_.unionBy(t, u, "order"), e => {
        result.push(_.merge(_.find(t, te => te.order === e.order), _.find(u, ue => ue.order === e.order)))
    });
    return result
}();
// [ { order: 'a123456', price: 125, title: 'test' },{ order: 'a123457', price: 124 } ]


// change an object in an array
_.chain(o).find({order: "a123457"}).merge({price: 126}).value();
// [ { order: 'a123456', price: 125, title: 'test' },{ order: 'a123457', price: 126 } ]

