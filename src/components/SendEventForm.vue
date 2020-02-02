<template>
  <form @submit="submit" class="px-8 pt-6 pb-8 mh-480">
    <h2 class="pb-6">#2 Send Event to a Workflow</h2>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="workflowId"
        >Workflow ID</label
      >
      <CustomSelect
        :value="workflowId"
        :options="workflowInstances"
        @change="change"
      />
      <FieldErrorMessage :error="errors.workflowId" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="event_name"
        >Event name</label
      >
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="event_name"
        type="text"
        placeholder="Event name"
        v-model="name"
      />
      <FieldErrorMessage :error="errors.name" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="event_data"
        >Event data</label
      >
      <json-textarea id="event_data" v-model="data" />
      <FieldErrorMessage :error="errors.data" />
    </div>

    <submit-button :onClick="submit">Send event</submit-button>
  </form>
</template>

<script>
import JsonTextarea from "../components/JsonTextarea.vue";
import CustomSelect from "../components/CustomSelect.vue";
import FieldErrorMessage from "../components/FieldErrorMessage.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "SendEventForm",
  components: {
    JsonTextarea,
    CustomSelect,
    FieldErrorMessage,
    SubmitButton
  },
  data() {
    return {
      errors: {
        workflowId: null,
        name: null,
        data: null
      }
    };
  },
  computed: {
    workflowInstances() {
      return [{ value: null, text: "-- Choose an instance --" }].concat(
        this.$store.state.workflowInstances.map(x => ({
          value: x.id,
          text: `${x.name} - ${x.id}`
        }))
      );
    },
    name: {
      get() {
        return this.$store.state.event.name;
      },
      set(name) {
        this.$store.commit("updateEventName", name);
      }
    },
    data: {
      get() {
        return this.$store.state.event.data;
      },
      set(data) {
        this.$store.commit("updateEventData", data);
      }
    },
    workflowId() {
      return this.$store.state.event.workflowId;
    }
  },
  methods: {
    change(id) {
      this.$store.commit("selectWorkflowInstance", id);
    },
    submit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return false;
      }

      this.$store.dispatch("sendEvent", {
        workflowId: this.workflowId,
        name: this.name,
        data: this.data
      });
    },
    validateForm() {
      this.errors = {};
      if (this.name == "") {
        this.errors.name = "required";
      }

      if (!this.workflowId) {
        this.errors.workflowId = "required";
      }

      try {
        const i = JSON.parse(this.data);
        if (!Array.isArray(i)) {
          this.errors.data = "Must be an array";
        }
      } catch (e) {
        this.errors.data = "Invalid JSON";
      }

      return Object.keys(this.errors).length === 0;
    }
  }
};
</script>
