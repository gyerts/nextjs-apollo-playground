export let FilterOperator;

(function(FilterOperator) {
  FilterOperator['equals'] = 'eq';
  FilterOperator['notEquals'] = 'neq';
  FilterOperator['lessThan'] = 'lt';
  FilterOperator['lessThanOrEquals'] = 'lte';
  FilterOperator['greaterThan'] = 'gt';
  FilterOperator['greaterThanOrEquals'] = 'gte';
  FilterOperator['inSet'] = 'in';
  FilterOperator['notInSet'] = 'nin';
  FilterOperator['range'] = 'range';
})(FilterOperator || (FilterOperator = {}));
