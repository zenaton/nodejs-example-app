import Vue from "vue";
import Vuex from "vuex";
import Api from "../services/zenaton";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workflowTypes: [],
    workflow: { name: "", input: "[]" },
    event: { name: "", data: "[]", workflowId: null },
    logs: { workflow: [], event: [] },
    workflowInstances: []
  },
  mutations: {
    setConfig(state, config) {
      const { workflows } = config;
      state.workflowTypes = workflows;
    },
    selectWorkflowType(state, name) {
      state.workflow.name = name;
      const w = state.workflowTypes.find(w => w.name === name);
      state.workflow.input = w.input ? JSON.stringify(w.input) : "[]";
    },
    selectWorkflowInstance(state, id) {
      const i = state.workflowInstances.find(w => w.id === id);
      const w = state.workflowTypes.find(w => w.name === i.name);
      state.event.workflowId = id;
      state.event.name = w.event.name ? w.event.name : "";
      state.event.data = w.event.data ? JSON.stringify(w.event.data) : "[]";
    },
    updateWorkflowName(state, name) {
      state.workflow.name = name;
    },
    updateWorkflowInput(state, input) {
      state.workflow.input = input;
    },
    updateEventName(state, name) {
      state.event.name = name;
    },
    updateEventData(state, data) {
      state.event.data = data;
    },
    updateEventWorkflow(state, workflowId) {
      state.event.workflowId = workflowId;
    },
    addLog(state, { logtype, log }) {
      state.logs[logtype] = [...state.logs[logtype], log];
    },
    addWorkflowInstance(state, instance) {
      state.workflowInstances = [...state.workflowInstances, instance];
    }
  },
  actions: {
    async getConfig({ commit }) {
      const config = await Api.getConfig();
      commit("setConfig", config);
      if (config.workflows.length > 0) {
        commit("selectWorkflowType", config.workflows[0].name);
      }
    },
    async dispatchWorkflow({ commit }, { name, input }) {
      const id = await Api.dispatchWorkflow(name, input);

      commit("addLog", {
        logtype: "workflow",
        log: `<span class="text-gray-600">[${new Date().toISOString()}]</span> <span class="text-yellow-400">${name}</span> dispatched with id <span class="text-green-400">${id}</span>`
      });

      commit("addWorkflowInstance", { name, id });
      // preselect the last dispatched workflow
      commit("selectWorkflowInstance", id);
    },
    async sendEvent(context, { workflowId, name, data }) {
      await Api.sendEvent(workflowId, name, data);

      context.commit("addLog", {
        logtype: "event",
        log: `<span class="text-gray-600">[${new Date().toISOString()}]</span> event <span class="text-blue-400">${name}</span> sent to workflow with id <span class="text-green-400">${workflowId}</span>`
      });
    }
  },
  modules: {}
});
