# EN10168-schemas

[![EN10168 Schema CI](https://github.com/thematerials-network/EN10168-schemas/actions/workflows/ci.yml/badge.svg)](https://github.com/thematerials-network/EN10168-schemas/actions/workflows/ci.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fs1seven%2FEN10168-schemas.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fs1seven%2FEN10168-schemas?ref=badge_shield)

The EN10168.schema.json is an implementation of the European Union steel standards of the same name.
This repository contains translations and templates used for HTML / PDF rendering of EN10168 certificates.

## Docs

[Full documentation](https://s1seven.github.io/SEP/EN10168/)

## Tests

To run the PDF rendering tests we use [pdf2image](https://github.com/yakovmeister/pdf2image) lib. Please refer to this [guide](https://github.com/yakovmeister/pdf2image/blob/master/docs/gm-installation.md) to install required dependencies.

## Updating the partials-map

When a new release is made, `update:partials-map` should run automatically and update the version of the `inspection` path.

When a new version of the `schema-definitions` is released, the script will need to be run manually, with the new version passed in along with the flag `-d` or `--newDefinitionsVersion`.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fthematerials-network%2FEN10168-schemas.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fthematerials-network%2FEN10168-schemas?ref=badge_large)
