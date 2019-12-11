import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import  colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.blue.accent3,
        secondary: colors.blueGrey.darken3,
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'md',
  },
});
