var req = require.context('./', true, /^\.\/[^_][\w-]+\/style\/index\.web\.js?$/);

req.keys().forEach((mod) => {
  req(mod);
});

import AppRegistry from './AppRegistry';

AppRegistry();
