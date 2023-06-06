import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
class API {
  public apiUrl: string = publicRuntimeConfig.API_URL;
}

export default API;
