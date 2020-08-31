/* eslint-disable no-param-reassign */
import { getAvailableMods } from 'satisfactory-mod-manager-api';

const modState = () => ({
  mods: [],
});

const getters = {
  filteredMods: (state) => state.mods,
};

const actions = {
  async init({ commit }) {
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
};

const mutations = {
  setAvailableMods(state, { mods }) {
    state.mods = mods;
  },
};

export default {
  namespaced: false,
  state: modState,
  getters,
  actions,
  mutations,
};
