import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { UserLayout } from 'src/components/pageLayout';
import { USER_ROLE } from 'src/utils/constant';
import SessionUtils from 'src/utils/sessionUtils';
import GuruOrangTuaView from './GuruOrangTuaView';
import { SiswaDetailSiswa } from 'src/components/userPage/SiswaDetail';

const UserContent = () => {
  const [isGuruOrangTua, setIsGuruOrangTua] = useState<boolean>(true);

  useEffect(() => {
    const role = SessionUtils.getRole();

    setIsGuruOrangTua(_.includes([USER_ROLE.GURU, USER_ROLE.ORANG_TUA], role));
  }, []);

  return <UserLayout>{isGuruOrangTua ? <GuruOrangTuaView /> : <SiswaDetailSiswa />}</UserLayout>;
};

export default UserContent;
