module.exports = {
  async getConfig() {
    return await this.get(`/config.json`);
  },
  async dispatchWorkflow(name, input) {
    const payload = JSON.parse(input);
    const { id } = await this.post(`/api/${name}/dispatch`, payload);
    return id;
  },
  async sendEvent(id, name, data) {
    const payload = { name, data: JSON.parse(data) };
    await this.post(`/api/${id}/event`, payload);
    return;
  },
  get(url) {
    return fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json());
  },
  post(url, payload) {
    return fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(response => {
      return response.json();
    });
  }
};
