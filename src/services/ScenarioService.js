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

const locationsGet = id => {
  return http.get(`/locations/${id}`);
};

const productFlowsGet = id => {
  return http.get(`/product_flows/${id}`);
};

export default {
  scenariosGetAll,
  scenariosGet,
  scenariosCreate,
  scenariosRemove,
  scenariosRemoveAll,
  scenariosFindByTitle,
  createMultipleLocationsByScenarioId,
  createMultipleProductFlowByScenarioId,
  locationsGet,
  productFlowsGet
};
