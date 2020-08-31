/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { getAvailableMods } from 'satisfactory-mod-manager-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      modFilters: {},
      sortBy: '',
      search: '',
    },
    profiles: [],
    selectedProfile: {},
    modFilters: [{
      name: 'All mods',
      mods: 0,
    }, {
      name: 'Compatible',
      mods: 0,
    }, {
      name: 'Favourite',
      mods: 0,
    }, {
      name: 'Installed',
      mods: 0,
    }, {
      name: 'Not installed',
      mods: 0,
    }],
    sortBy: ['Last updated', 'Name', 'Popularity', 'Hotness', 'Views', 'Downloads'],
    satisfactoryInstalls: [],
    selectedInstall: {},
    smlVersions: [],
    mods: [],
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
  mutations: {
    setAvailableMods(state, { mods }) {
      state.mods = mods;
    },
  },
  actions: {
    async initApp({ commit }) {
      const page = await getAvailableMods(0);
      // const mods = page.flat(1);
      const mods = page;
      commit('setAvailableMods', {
        mods: mods.map((mod) => ({
          modInfo: mod,
          isInstalled: false,
          isCompatible: true,
          isDependency: false,
          manifestVersion: null,
          installedVersion: null,
        })),
      });
    },
  },
  getters: {
    allMods(state) {
      return [...state.mods, ...state.hiddenInstalledMods];
    },
    filteredMods(state) {
      return state.mods;
    },
  },
});
