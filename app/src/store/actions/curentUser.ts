import _ from 'lodash';
import axios from 'src/store/axios';
import { ILoginPayload } from 'src/utils/interface';
import SessionUtils from 'src/utils/sessionUtils';
import { getResourceURL, getLoginResultUrl } from 'src/utils/user';

export const userLogin = (payload: ILoginPayload) => async () => {
  try {
    const { data } = await axios.post(
      `${getResourceURL(payload.role)}/login`,
      _.omit(payload, ['role'])
    );

    SessionUtils.setToken(data.token);

    const role = SessionUtils.getRole();

    if (!role) return;

    return getLoginResultUrl(role);
  } catch (e) {
    return Promise.reject(e);
  }
};
