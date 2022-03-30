import { RESOURCE_NAME } from './constant';
import {
  IGuru,
  IUser,
  ISiswa,
  IOrangTua,
  IKategoriPelanggaran,
  IPelanggaran,
  ISiswaDetail,
} from './interface';

export type ResourceKey = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export interface IResources {
  users: IUser;
  gurus: IGuru;
  siswas: ISiswa;
  'orang-tuas': IOrangTua;
  'kategori-pelanggarans': IKategoriPelanggaran;
  pelanggarans: IPelanggaran;
}

export interface IFlexibleResource<T extends ResourceKey> {
  rows: {
    [id: number]: IResources[T];
  };
  count: number;
}

export interface IResourcesWithId {
  users: IFlexibleResource<'users'>;
  gurus: IFlexibleResource<'gurus'>;
  siswas: IFlexibleResource<'siswas'>;
  'orang-tuas': IFlexibleResource<'orang-tuas'>;
  'kategori-pelanggarans': IFlexibleResource<'kategori-pelanggarans'>;
  pelanggarans: IFlexibleResource<'pelanggarans'>;
}

export interface IDetailResource extends Omit<IResources, 'siswas'> {
  siswas: ISiswaDetail;
}
