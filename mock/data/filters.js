(function(w) {
  var Data = w.Data = w.Data || {};

  Data.filters = function() {
    var content = [f1, f2, f3];
    return {widget: 'Group', cls: 'widget', nodes: content};
  };

  var f1 = {
    widget: 'Filter',
    rule: {
      op: 'and',
      rules: [
        {
          op: 'or',
          rules: [
            {field: 'year', op: 'gt', value: '1990'},
            {field: 'beds', op: 'gt', value: '2'},
          ]
        },
        {field: 'zipcode', op: 'eq', value: '94403'},
        {field: 'sqft', op: 'lt', value: '4000'},
      ],
    }
  };

  var f2 = {
    widget: 'Filter',
    rule: {
      op: 'or',
      rules: [
        {
          op: 'and',
          rules: [
            {field: 'price', op: 'lt', value: '3000000'},
            {field: 'beds', op: 'gt', value: '2'},
          ]
        },
        {field: 'sewer', op: 'eq', value: 'septic'},
        {field: 'property_type', op: 'eq', value: 'house'},
        {
          op: 'or',
          rules: [
            {field: 'property_owner', op: 'eq', value: 'somebody'},
            {field: 'property_owner', op: 'eq', value: null},
          ],
        },
        {field: 'property_loan', op: 'lt', value: '1000000'},
      ],
    }
  };

  var f3 = {
    widget: 'Filter',
    rule: {
      op: 'and',
      rules: [
        {
          op: 'or',
          rules: [
            {field: 'year', op: 'gt', value: '1995'},
            {field: 'beds', op: 'gt', value: '2'},
          ]
        },
        {field: 'zipcode', op: 'eq', value: '92345'},
        {field: 'sqft', op: 'lt', value: '4000'},
      ],
    }
  };

  var fields = {
    'zipcode': { name: 'zipcode', ops: ['eq', 'in'] },
    'property_type': { name: 'type', ops: ['eq', 'in'] },
    'year': { name: 'year', ops: ['eq', 'range', 'gt', 'gte', 'lt', 'lte'] },
    'price': { name: 'price', ops: ['eq', 'range', 'gt', 'gte', 'lt', 'lte'] },
    'beds': { name: 'beds', ops: ['eq', 'gt', 'gte', 'lt', 'lte'] },
    'baths': { name: 'baths', ops: ['eq', 'gt', 'gte', 'lt', 'lte'] },
    'sqft': { name: 'baths', ops: ['eq', 'range', 'gt', 'gte', 'lt', 'lte'] },
    'sewer': { name: 'sewer', ops: ['eq'] },
  };
})(this);

/*

{
  op: 'eq | in | range | match | gt | gte | lt | lte | like',
  not: 'boolean',
  value: 'object',
  field: 'string',
  none: 'bool',
}


Example of normal filters:
[
    [
        {"field": "zipcode", "set": ["34758"],
            "negate": false, "match_none": false},
        {"field": "property_type", "set": ["SFR"],
            "negate": false, "match_none": false},
        {"field": "year_built", "rng": [[1980, null]],
            "negate": false, "match_none": false},
        {"field": "list_price", "rng": [[90000, 270000]],
            "negate": false, "match_none": false},
        {"field": "beds", "rng": [[3, 5]],
            "negate": false, "match_none": false},
        {"field": "baths", "rng": [[2, null]],
            "negate": false, "match_none": false},
        {"field": "sqft", "rng": [[1125, 3000]],
            "negate": false, "match_none": true},
        {"field": "sewer", "set": ["septic"],
            "negate": true, "match_none": false}
    ]
]

Diff filters:
[
    [{"field": "_match__old", "set": [false]}],
    [{"field": "list_price__changed", "set": [true]}]
]

Naming of diff fields: shortname__picker (two underscores is a separator)
The shortname is either a regular field name, or one of the special names:
    _empty
    _match

The picker is one of:
    old
    new
    incr
    ratio
    changed

Examples:
    list_price__old
    baths__new
    sqft__ratio
    year_built__incr
    mls_state__changed
    _empty__old
    _match__new
*/
