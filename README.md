# @francocorrea/cov-vaccine-uy-validate

A library to validate the COVID-19 vaccine certificate issued by the Uruguayan government.

## Compatibility

Works in Node, React Native and Web (through WebCrypto).

## Demo

A live demo is available and published on https://coverifi-fcs.vercel.app/

## Usage

```ts
import { verify } from '@francocorrea/cov-vaccine-uy-validate';

const data = 'HC1:(...)' // Data obtained from scanning the QR code

const results = await verify(data);
/*
    {
      "valid": true, // if false, the digital signature verification has failed
      "data": {
        "Date": "2021-08-01",
        "Name": "Nombres Apellidos",
        "CountryCode": "858",
        "DocumentType": "CI",
        "DocumentNumber": "11111111",
        "VaccinationInfo": {
            "Doses": [
                {
                    "Number": 2,
                    "Date": "2021-07-01",
                    "Vaccine": "PFIZER"
                },
                {
                    "Number": 2,
                    "Date": "2021-06-01",
                    "Vaccine": "PFIZER"
                },
            ] 
        }
    }
 */
```
