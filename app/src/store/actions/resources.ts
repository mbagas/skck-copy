import axios from 'src/store/axios';
import { AppDispatch } from 'src/store';
import { CreateUserType } from 'src/utils/interface';
import { IResources, IResourcesWithId, ResourceKey } from 'src/utils/resourceInterface';
import { generateUserName } from 'src/utils/user';

interface IActionUpdate<T extends ResourceKey> {
  id: number;
  data: IResources[T];
}

export const setResource = <T extends ResourceKey>(
  resourceName: T,
  payload: IResourcesWithId[T]
) => ({
  type: `resources.${resourceName}.set`,
  payload,
});

export const updateResource = <T extends ResourceKey>(
  resourceName: T,
  payload: IActionUpdate<T>
) => ({
  type: `resources.${resourceName}.update`,
  payload,
});

export const overwriteResource = <T extends ResourceKey>(
  resourceName: T,
  payload: IResourcesWithId[T]
) => ({
  type: `resources.${resourceName}.overwrite`,
  payload,
});

export const deleteResource = <T extends ResourceKey>(resourceName: T, id: number) => ({
  type: `resources.${resourceName}.delete`,
  payload: id,
});

// overwrite state by default
export const getAllData =
  <T extends ResourceKey>(resourceName: T, query = '', overwrite = true) =>
  async () => {
    await axios.get(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });
  };

// get resource base on id
export const getDataById =
  <T extends ResourceKey>(resourceName: T, id: number, query = '', overwrite = false) =>
  async () => {
    const { data } = await axios.get(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

// Add new data to resource
export const addData =
  <T extends ResourceKey>(resourceName: T) =>
  (payload: Omit<ResourceKey, 'id' | 'createdAt'>) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post(`/${resourceName}`, payload, {
      headers: {
        resourceName,
      },
    });

    return dispatch(updateResource(resourceName, { id: data.id, data }));
  };

// Update the data by id
export const updateData =
  <T extends ResourceKey>(resourceName: T) =>
  (id: number, update: Partial<IResources[T]>, query = '') =>
  async () => {
    const { data } = await axios.patch(`/${resourceName}/${id}?${query}`, update, {
      headers: {
        resourceName,
      },
    });

    return data;
  };

// Delete the data by id
export const deleteData =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  async (dispatch: AppDispatch) => {
    await axios.delete(`/${resourceName}/${id}`);

    return dispatch(deleteResource(resourceName, id));
  };

export const createUser = (payload: CreateUserType) => async () => {
  const newPayload = generateUserName(payload);

  try {
    await axios.post(`/users`, newPayload);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateUser = (id: number, payload: Partial<CreateUserType>) => async () => {
  try {
    await axios.post(`/users/${id}`, payload);
  } catch (e) {
    return Promise.reject(e);
  }
};
