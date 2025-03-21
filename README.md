**The code and schema definitions from this repository have been migrated to https://github.com/material-identity/schemas.**

# EN10168-schemas

[![EN10168 Schema CI](https://github.com/material-identity/EN10168-schemas/actions/workflows/ci.yml/badge.svg)](https://github.com/material-identity/EN10168-schemas/actions/workflows/ci.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B18065%2Fgit%40github.com%3Amaterial-identity%2FEN10168-schemas.git.svg?type=shield)](https://app.fossa.com/projects/custom%2B18065%2Fgit%40github.com%3Amaterial-identity%2FEN10168-schemas.git?ref=badge_shield)

The EN10168.schema.json is an implementation of the European Union steel standards of the same name.
This repository contains translations and templates used for HTML / PDF rendering of EN10168 certificates.

## Docs

[Full documentation](https://s1seven.github.io/SEP/EN10168/)

## Tests

To run the PDF rendering tests we use [pdf2image](https://github.com/yakovmeister/pdf2image) lib. Please refer to this [guide](https://github.com/yakovmeister/pdf2image/blob/master/docs/gm-installation.md) to install required dependencies.

## Editing a local partial

When editing a local partial such as `inspection.hbs`, run the script `npm run set-local-paths` to use the local partials for HTML rendering instead of the remote ones. The paths will be updated automatically when a release is made using the `update-version` script.

## Testing a locally updated schema definition

When you update a schema definition locally, you will want to test it before releasing it. To do so, open the `schema.json` file, and change the `$id` value to `schema.json`. Then update the `$ref` of the updated definition with an absolute path to the updated definition, plus the following string: `#/definitions/<definition name>`.

For example, to test an updated `Company` definition, the `schema.json` should look like this:

```json
{
"$id": "schema.json",
  "definitions": {
    ...
    "Company": {
      "allOf": [
        {
          "$ref": "/Users/<username>/s1seven/schema-definitions/company/company.json#/definitions/Company"
        }
      ]
    },
  }
}
```

After testing and the release of the schema definition, simply return the `$id` to its previous value and the `$ref` to the uri of the newly released schema definition.

If you have trouble loading the file, you can **temporarily** update the property `loadSchema` in `createAjvInstance` in `validate.spec.js` to the following to debug the filepath:

```js
    loadSchema: (uri) => {
      if (!uri.startsWith('http')) {
        console.log(uri);
      }
      return loadExternalFile(uri, 'json');
    },
```

## Updating the partial versions in schema.json

First, update `defaultSchemaDefinitionsVersion` in `utils/constants.js` to the latest version number.

Then run `npm run update-version`.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B18065%2Fgit%40github.com%3Amaterial-identity%2FEN10168-schemas.git.svg?type=large)](https://app.fossa.com/projects/custom%2B18065%2Fgit%40github.com%3Amaterial-identity%2FEN10168-schemas.git?ref=badge_large)
