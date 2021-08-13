const rootMain = require('../../../.storybook/main');

rootMain.core = { ...rootMain.core, builder: 'webpack5' };

// Use the following syntax to add addons!
// rootMain.addons.push('');
rootMain.stories.push(...['./stories/*.stories.@(js|jsx|ts|tsx)']);
rootMain.addons.push(...'@storybook/addon-jest');

module.exports = rootMain;
