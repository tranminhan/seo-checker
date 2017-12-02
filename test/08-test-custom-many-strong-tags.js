'use strict';

const test       = require('tape'),
      seoChecker = require('../seo-checker.js'),
      rule1      = require('../rules/too-many-strong-tags.js');

const customRule = (dom) => rule1(dom, { strongTagLimit: 10 });
const rules = [customRule];

test('check not many strong tags', function (t) {
    t.plan(1);

    seoChecker.check('./fixtures/not-many-strong-tags.html', rules)
        .then(issues => {
            t.equal(issues.length, 0);
        });
});

test('check more than 10 strong tags', function (t) {
    t.plan(2);

    seoChecker.check('./fixtures/more-than-15-strong-tags.html', rules)
        .then(issues => {
            t.equal(issues.length, 1);
            t.equal(issues[0], '16 strong tags found, more than a good limit at 10');
        });
});