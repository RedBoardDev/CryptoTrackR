
module.exports = {
  babel: {
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src/'],
          alias: {
            '@icons': 'assets/icons',
            '@images': 'assets/images',
            '@components': 'components',
            '@enums': 'enums',
            '@hooks': 'hooks',
            '@services': 'services',
            '@contexts': 'contexts',
            '@utils': 'utils',
            '@views': 'views',
          },
        },
      ],
    ],
  },
};
