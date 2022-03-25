import { RootState } from 'src/store';
import { ResourceKey, IResources, IResourcesWithId } from 'src/utils/resourceInterface';

export const getResource = <T extends ResourceKey>(
  state: RootState,
  resourceName: T
): IResourcesWithId[T] => state.resources[resourceName];

export const getResourceById =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  (state: RootState) =>
    state.resources[resourceName]['rows'][id] as IResources[T];

export const getResourceByIdInRoutes =
  <T extends ResourceKey>(resourceName: T, state: RootState) =>
  (id: number) =>
    state.resources[resourceName]['rows'][id] as IResources[T];

export const getResourceCounts =
  <T extends ResourceKey>(resourceName: T) =>
  (state: RootState) =>
    state.resources[resourceName]['count'];
