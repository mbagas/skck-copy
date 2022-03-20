import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  IFlexibleResource,
  IResources,
  IResourcesWithId,
  ResourceKey,
} from 'src/utils/resourceInterface';
import { hasOwnProperty } from 'src/utils/typeHelper';

interface IPayload<K> {
  id: number;
  data: K;
}

interface IPayloads<T extends ResourceKey> {
  rows: IResources[T][];
  count: number;
}

interface IAction<T extends ResourceKey, K extends IResources[T]> {
  type: string;
  payload: IPayload<K> | IPayloads<T> | number;
}

const reducer =
  <T extends ResourceKey, K extends IResources[T]>(resourceName: T) =>
  (state: IFlexibleResource<T> = { rows: {}, count: 0 }, action: IAction<T, K>) => {
    let temp: IFlexibleResource<T> = { rows: {}, count: 0 };

    switch (action.type) {
      case `resources.${resourceName}.set`:
        if (!hasOwnProperty(action.payload, 'rows') || _.isNumber(action.payload)) return state;

        const data = _.isArray(action.payload.rows) ? action.payload.rows : [action.payload.rows];

        return {
          ...state,
          rows: {
            ...state.rows,
            ..._.keyBy(data, 'id'),
          },
        };

      case `resources.${resourceName}.update`:
        if (hasOwnProperty(action.payload, 'rows') || _.isNumber(action.payload)) return state;

        return {
          ...state,
          rows: {
            ...state.rows,
            [action.payload.id]: action.payload.data,
          },
        };

      case `resources.${resourceName}.delete`:
        if (!_.isNumber(action.payload)) return state;

        temp = _.cloneDeep(state);

        delete temp['rows'][action.payload];
        return temp;

      case `resources.${resourceName}.overwrite`:
        if (!hasOwnProperty(action.payload, 'rows') || _.isNumber(action.payload)) return state;

        const data1 = _.isArray(action.payload.rows) ? action.payload.rows : [action.payload.rows];

        return {
          rows: _.keyBy(data1, 'id'),
          count: action.payload.count,
        };

      default:
        return state;
    }
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allReducer: Record<ResourceKey, any> = {} as any;

_.forEach(RESOURCE_NAME, (resName: ResourceKey) => {
  allReducer[resName] = reducer(resName);
});

export default combineReducers<IResourcesWithId>(allReducer);
