import {generate} from '@s1seven/schema-tools/dist/generate-interfaces';
import certificate from '../certificate.json';

async function createInterfaces() {
    const interfaces = await generate(certificate.RefSchemaUrl, './schemaTypes.ts');
    console.log(interfaces);
}
createInterfaces();