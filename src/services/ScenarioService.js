import http from "../http-common";

const scenariosGetAll = () => {
  return http.get("/scenarios");
};

const scenariosGet = id => {
  return http.get(`/scenarios/${id}`);
};

const scenariosCreate = data => {
  return http.post("/scenarios", data);
};

const scenariosUpdate = (id, data) => {
  return http.put(`/scenarios/${id}`, data);
};

const scenariosRemove = id => {
  return http.delete(`/scenarios/${id}`);
};

const scenariosRemoveAll = () => {
  return http.delete(`/scenarios`);
};

const scenariosFindByTitle = title => {
  return http.get(`/scenarios?title=${title}`);
};

const createMultipleLocationsByScenarioId =  (id, data) => {
  return http.post(`/locations/${id}`, data);
};

const createMultipleProductFlowByScenarioId =  (id, data) => {
  return http.post(`/product_flows/${id}`, data);
};

export default {
  scenariosGetAll,
  scenariosGet,
  scenariosCreate,
  scenariosUpdate,
  scenariosRemove,
  scenariosRemoveAll,
  scenariosFindByTitle,
  createMultipleLocationsByScenarioId,
  createMultipleProductFlowByScenarioId
};
