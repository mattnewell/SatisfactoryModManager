/* eslint-disable no-param-reassign */
import { getAvailableMods, getModsCount, MODS_PER_PAGE } from 'satisfactory-mod-manager-api';

const modState = () => ({
  mods: [],
});

const getters = {
  filteredMods: (state) => state.mods,
};

async function loadAvailableMods(commit) {
  const modCount = await getModsCount();
  const modPages = Math.ceil(modCount / MODS_PER_PAGE);
  const results = [];
  for (let i = 0; i <= modPages; i += 1) {
    results.push(getAvailableMods(i));
  }
  const mods = (await Promise.all(results)).flat();
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
}

const actions = {
  async init({ commit }) {
    await loadAvailableMods(commit);
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
