<template>
  <form @submit="submit" class="px-8 pt-6 pb-8 mh-400">
    <div class="md:flex md:items-center mb-4">
      <div class="md:w-1/2">
        <h2>#1 Dispatch Workflow</h2>
      </div>
      <div class="md:w-1/2">
        <CustomSelect
          v-if="workflows.length > 1"
          :options="workflows"
          @change="change"
        />
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="event_name"
        >Workflow name</label
      >
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="event_name"
        type="text"
        placeholder="Workflow name"
        v-model="name"
      />
      <FieldErrorMessage :error="errors.name" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="input"
        >Workflow input</label
      >
      <json-textarea id="workflow_input" v-model="input" />
      <FieldErrorMessage :error="errors.input" />
    </div>
    <submit-button :onClick="submit">Dispatch</submit-button>
  </form>
</template>

<script>
import JsonTextarea from "../components/JsonTextarea.vue";
import SubmitButton from "../components/SubmitButton.vue";
import CustomSelect from "../components/CustomSelect.vue";
import FieldErrorMessage from "../components/FieldErrorMessage.vue";

export default {
  name: "DispatchForm",
  components: {
    JsonTextarea,
    SubmitButton,
    FieldErrorMessage,
    CustomSelect
  },
  data() {
    return {
      errors: {
        name: null,
        input: null
      }
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.workflow.name;
      },
      set(name) {
        this.$store.commit("updateWorkflowName", name);
      }
    },
    input: {
      get() {
        return this.$store.state.workflow.input;
      },
      set(input) {
        this.$store.commit("updateWorkflowInput", input);
      }
    },
    workflows() {
      return [{ value: null, text: "-- Choose an workflow --" }].concat(
        this.$store.state.workflowTypes.map(x => {
          return {
            value: x.name,
            text: x.name
          };
        })
      );
    }
  },
  methods: {
    change(name) {
      if (name) {
        this.$store.commit("selectWorkflowType", name);
      }
    },
    submit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return false;
      }

      this.$store.dispatch("dispatchWorkflow", {
        name: this.name,
        input: this.input
      });
    },
    validateForm() {
      this.errors = {};
      if (this.name == "") {
        this.errors.name = "required";
      }

      try {
        const i = JSON.parse(this.input);
        if (!Array.isArray(i)) {
          this.errors.input = "Must be an array";
        }
      } catch (e) {
        this.errors.input = "Invalid JSON";
      }

      return Object.keys(this.errors).length === 0;
    }
  }
};
</script>
