module.exports = {
  packagerConfig: {
    icon: 'inethi/front/assets/images/icon/icon', // no file extension required
    ignore: [
      "/inethi/dastyle"
    ]
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {},
    // },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin'],
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'inethi/front/assets/images/icon/icon.png'
        }
      },
      // name: '@electron-forge/maker-dmg',
      // config: {
      //   format: 'ULFO',
      //   background: './inethi/front/assets/images/icon/dmg_background.png',
      //   icon: './inethi/front/assets/images/icon/icon.png'
      // }
    },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],
};
