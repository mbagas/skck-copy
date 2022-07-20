/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'src/store/axios';
import { AppDispatch } from 'src/store';
import {
  CreateUserType,
  IBaseKategoriPelanggaran,
  RoleType,
  IChangePass,
  ISuratPeringatan,
  IGrafiks,
} from 'src/utils/interface';
import {
  IDetailResource,
  IResources,
  IResourcesWithId,
  ResourceKey,
} from 'src/utils/resourceInterface';
import { getResourceURL } from 'src/utils/user';
import { generateUserName } from 'src/utils/user';
import { RESOURCE_NAME, GRAFIKS_URL, SP_URL } from 'src/utils/constant';

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
    const { data } = await axios.get(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
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

    return data as IDetailResource[T];
  };

// Add new data to resource
export const addData =
  <T extends ResourceKey>(resourceName: T) =>
  (payload: any) =>
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
  (id: number, update: any, query = '') =>
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
  <T extends ResourceKey>(resourceName: T, id: number, noRequest = false) =>
  async (dispatch: AppDispatch) => {
    if (!noRequest) await axios.delete(`/${resourceName}/${id}`);

    return dispatch(deleteResource(resourceName, id));
  };

export const createUser = (payload: CreateUserType) => async (dispatch: AppDispatch) => {
  const newPayload = generateUserName(payload);

  try {
    await addData(RESOURCE_NAME.USERS)(newPayload)(dispatch);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateUser = (id: number, payload: Partial<CreateUserType>) => async () => {
  try {
    await updateData(RESOURCE_NAME.USERS)(id, generateUserName(payload))();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createKategori =
  (payload: IBaseKategoriPelanggaran) => async (dispatch: AppDispatch) => {
    try {
      await addData(RESOURCE_NAME.KATEGORI_PELANGGARANS)(payload)(dispatch);
    } catch (e) {
      return Promise.reject(e);
    }
  };

export const updateKategori =
  (id: number, payload: Partial<IBaseKategoriPelanggaran>) => async () => {
    try {
      await updateData(RESOURCE_NAME.KATEGORI_PELANGGARANS)(id, payload)();
    } catch (e) {
      return Promise.reject(e);
    }
  };

export const getPelanggaranSiswa =
  (id: number, query = '', overwrite = true) =>
  async () => {
    await axios.get(`/${RESOURCE_NAME.SISWAS}/${id}/${RESOURCE_NAME.PELANGGARANS}?${query}`, {
      headers: {
        resourceName: RESOURCE_NAME.PELANGGARANS,
        overwrite,
      },
    });
  };

export const createPelanggarans = (siswaId: number, pelanggaransId: number[]) => async () => {
  try {
    await axios.post(`/${RESOURCE_NAME.PELANGGARANS}`, { siswaId, pelanggaransId });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const changePassword = (id: number, role: RoleType, payload: IChangePass) => async () => {
  try {
    await axios.post(`/${getResourceURL(role)}/${id}/password`, payload);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getSuratPelanggaran = (nis: number, spKe: number) => async () => {
  try {
    const { data } = await axios.get(`/${SP_URL}/${nis}/${spKe}`);

    return data as ISuratPeringatan;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getGrafik = () => async () => {
  try {
    const { data } = await axios.get(`/${GRAFIKS_URL}`);
    return data as IGrafiks;
  } catch (err) {
    return Promise.reject(err);
  }
};
