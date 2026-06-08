const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // 如果需要按需引入 antd 5 之前的版本定制主题，可以在这里配置 javascriptEnabled 和 modifyVars
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};