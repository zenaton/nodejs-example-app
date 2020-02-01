module.exports = {
  default_workflow: "ParallelWorkflow",
  workflows: [
    {
      name: "ParallelWorkflow",
      input: [],
      event: { name: "", data: [] }
    },
    {
      name: "ParentWorkflow",
      input: [],
      event: { name: "", data: [] }
    },
    {
      name: "ParallelParentWorkflow",
      input: [],
      event: { name: "", data: [] }
    },
    {
      name: "DateWorkflow",
      input: [{ email: "john@document.com" }, { date: 1580220000 }],
      event: { name: "", data: [] }
    },
    {
      name: "RandomWorkflow",
      input: [],
      event: { name: "", data: [] }
    },
    {
      name: "VersionWorkflow",
      input: [],
      event: { name: "", data: [] }
    }
  ]
};
