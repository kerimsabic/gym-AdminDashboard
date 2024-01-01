import appAxios from "./appAxios";

export const configureAxiosInterceptors = () => {
    // Response Interceptor
    appAxios.interceptors.response.use(undefined, (error) => {
      console.log("ERROR HAPPENED AGAIN configureAxiosInterceptors ", error.response);
      const status = (error.response || {}).status;
      if (status === 401) {
        // Perform logout
        console.log("LOGOUT");
      } else {
        error.handleGlobally = errorHandler(error);
      }
      return Promise.reject(error);
    });
  
    // Request Interceptor
    appAxios.interceptors.request.use(async (config) => {
      const token = "";
      config.headers.Authorization = token;
      return config;
    });
  };

function errorHandler(error: any): any {
    throw new Error("Function not implemented.");
}
  