import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { IResources, IResourcesWithId, ResourceKey } from './resourceInterface';

interface IAxiosRequestHeaders extends AxiosRequestHeaders {
  Authorization: string;
  resourceName: ResourceKey;
  overwrite: boolean;
}

export interface IAxiosInstance extends AxiosInstance {
  config?: {
    headers?: IAxiosRequestHeaders;
  };
}

export interface IAxiosReq extends AxiosRequestConfig {
  headers?: IAxiosRequestHeaders & {
    Authorization?: string;
    resourceName?: ResourceKey;
  };
  resourceName?: ResourceKey;
  overwrite?: boolean;
}

interface IAxiosRequestConfig extends AxiosRequestConfig {
  resourceName: ResourceKey;
  overwrite: boolean;
}

export interface IAxiosRes extends AxiosResponse {
  config: IAxiosRequestConfig;
}

export type ResourceRes<T extends ResourceKey> = IAxiosRes & {
  payload: IResources[T];
};

export type ResourcesRes<T extends ResourceKey> = IAxiosRes & {
  payload: IResourcesWithId[T];
};

export type ResourceIdResponse<T extends ResourceKey> = IAxiosRes & IResources[T];
