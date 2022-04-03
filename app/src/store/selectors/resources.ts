import _ from 'lodash';
import { RootState } from 'src/store';
import { ORDER } from 'src/utils/constant';
import { ResourceKey, IResources, IResourcesWithId } from 'src/utils/resourceInterface';

export const getResource = <T extends ResourceKey>(
  state: RootState,
  resourceName: T
): IResourcesWithId[T] => state.resources[resourceName];

export const getResourceById =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  (state: RootState) =>
    state.resources[resourceName].rows[id] as IResources[T];

export const getResourceByIdInRoutes =
  <T extends ResourceKey>(resourceName: T, state: RootState) =>
  (id: number) =>
    state.resources[resourceName].rows[id] as IResources[T];

export const getResourceCounts =
  <T extends ResourceKey>(resourceName: T) =>
  (state: RootState) =>
    state.resources[resourceName].count;

export const getResourceOrder = (state: RootState, order: typeof ORDER[keyof typeof ORDER]) => {
  const resource = state.resources.pelanggarans;

  const sorted = _.toArray(resource.rows).sort((a, b) => {
    const date1 = Number(new Date(_.get(a, 'createdAt')));
    const date2 = Number(new Date(_.get(b, 'createdAt')));

    return order === ORDER.ASC ? date1 - date2 : date2 - date1;
  });

  return {
    rows: _.keyBy(sorted, 'id'),
    count: resource.count,
  };
};
