/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import modsource from './modules/modsource';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modsource,
  },
  state: {
    filters: {
      modFilters: {},
      sortBy: '',
      search: '',
    },
    profiles: [],
    selectedProfile: {},
    modFilters: [{ name: 'All mods', mods: 0 }, { name: 'Compatible', mods: 0 }, { name: 'Favourite', mods: 0 }, { name: 'Installed', mods: 0 }, { name: 'Not installed', mods: 0 }],
    sortBy: ['Last updated', 'Name', 'Popularity', 'Hotness', 'Views', 'Downloads'],
    satisfactoryInstalls: [],
    selectedInstall: {},
    smlVersions: [],
    hiddenInstalledMods: [],
    expandedModId: '',
    favoriteModIds: [],
    inProgress: [], // { id: string, progresses: { id: string, progress: number, message: string, fast: boolean }[] }
    currentDownloadProgress: {},
    error: '',
    errorPersistent: false,
    isGameRunning: false,
    isLaunchingGame: false,
    expandModInfoOnStart: false,
  },
  actions: {
    async initApp({ dispatch }) {
      // await modsource.actions.init(commit);
      dispatch('init');
    },
  },
});
