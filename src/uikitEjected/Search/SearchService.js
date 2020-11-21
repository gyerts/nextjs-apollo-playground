import {FilterOperator} from "./types";

export const getTemporaryFiltersAfterOneValueUpdate = (
    field,
    value,
    operator = FilterOperator.equals,
    filtersData
) => {
    let filters = [...filtersData];

    if (value.length === 0) {
        filters = filters.filter(x => x.field !== field);
    } else {
        const filterIndex = filters.findIndex(x => x.field === field);
        if (filterIndex >= 0) {
            filters[filterIndex] = { ...filters[filterIndex], value, operator };
        } else {
            filters.push({ field, value, operator });
        }
    }
    return filters;
}