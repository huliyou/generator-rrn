'use strict';
const port = '<%= port %>';
const host = 'localhost';
let prod;
try {
  prod = process.env.NODE_ENV === 'production';
} catch (e) {
  prod = false;
}

module.exports = {
  // dev
  port,
  host,
  // prod
  prod,
};
