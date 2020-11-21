import {makeSchema} from '@nexus/schema';
import {Query} from './allTypes';
import path from 'path';

export const schema = makeSchema({
  types: {
    Query,
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema'),
    typegen: path.join(process.cwd(), 'src', 'generated', 'gql-types.ts'),
  }
});
