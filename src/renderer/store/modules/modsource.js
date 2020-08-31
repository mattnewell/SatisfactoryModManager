import { getAvailableMods } from 'satisfactory-mod-manager-api';

const state = () => ({
  mods: [],
});

// TODO: This getter doesn't seem to work right?
const getters = {
  // eslint-disable-next-line no-shadow
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
  // eslint-disable-next-line no-shadow
  setAvailableMods(state, { mods }) {
    // eslint-disable-next-line no-param-reassign
    state.mods = mods;
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
