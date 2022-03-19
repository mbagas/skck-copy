/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { AppDispatch } from 'src/store';
import { IAxiosRes, IAxiosInstance, IAxiosReq } from 'src/utils/axiosInterface';
import SessionUtils from 'src/utils/sessionUtils';
import { overwriteResource, setResource, updateResource } from './actions/resources';

const instance: IAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const applyInterceptors = (dispatch: AppDispatch) => {
  instance.interceptors.request.use(
    (conf) => {
      const token = SessionUtils.getToken();
      const config = conf as IAxiosReq;

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        config.resourceName = config.headers.resourceName;
        config.overwrite = config.headers.overwrite;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use((res) => {
    const { config, data } = res as IAxiosRes;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;
