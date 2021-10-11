#!/usr/bin/env zx
const response = axios.get('https://data.ripple.com/v2/payments/');

let csvContent = 'data:text/csv;charset=utf-8,' + response.data.map((e) => e.join(',')).join('\n');
