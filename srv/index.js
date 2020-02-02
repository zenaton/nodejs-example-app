import express from "express";
import zenaton from "../src/zenaton";
const publicPath = __dirname + "/../dist";

export default app => {
  app.use(express.json());
  app.use(express.static(publicPath, {}));

  app.post("/api/:workflow_name/dispatch", async (req, res) => {
    console.log(
      `Dispatch a new instance of ${
        req.params.workflow_name
      } with input: ${JSON.stringify(req.body, null, 2)}`
    );

    const { id } = await zenaton.run.workflow(
      req.params.workflow_name,
      ...req.body
    );

    res.json({ id });
  });

  app.post("/api/:workflow_id/event", async (req, res) => {
    console.log(
      `Send an event ${req.body.name} to instance ${
        req.params.workflow_id
      } with data: ${JSON.stringify(req.body.data, null, 2)}`
    );

    await zenaton.select
      .workflow()
      .withId(req.params.workflow_id)
      .send(req.body.name, ...req.body.data);

    res.json({});
  });
};
