import { createAjv } from '@jsonforms/core';
import ajvErrors from 'ajv-errors';

const ajv = createAjv({ allErrors: true });
ajvErrors(ajv);

export default ajv;
