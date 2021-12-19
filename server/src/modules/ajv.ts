import AJV from 'ajv';
import Draft4 from 'ajv/lib/refs/json-schema-draft-04.json';

const ajv = new AJV({
  schemaId: 'auto',
  allErrors: true,
  jsonPointers: true,
  errorDataPath: 'property',
  verbose: true,
});
ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
ajv.addMetaSchema(Draft4);

export default ajv;
