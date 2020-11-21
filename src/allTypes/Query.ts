import {queryType, } from '@nexus/schema';

export const Query = queryType({
  definition(t): void {
    t.string('name', {resolve: () => 'Yuriy'})
  }
});
