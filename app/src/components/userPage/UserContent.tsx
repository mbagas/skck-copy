import React, { useEffect, useState } from 'react';
import { UserLayout } from 'src/components/pageLayout';
import { USER_ROLE } from 'src/utils/constant';
import SessionUtils from 'src/utils/sessionUtils';
import GuruOrangTuaView from './GuruOrangTuaView';
import SiswaDetail from './SiswaDetail';

const UserContent = () => {
  const [isGuruOrangTua, setIsGuruOrangTua] = useState<boolean>(false);

  useEffect(() => {
    const role = SessionUtils.getRole();

    setIsGuruOrangTua(role === USER_ROLE.GURU || role === USER_ROLE.ORANG_TUA);
  }, []);

  return <UserLayout>{isGuruOrangTua ? <GuruOrangTuaView /> : <SiswaDetail />}</UserLayout>;
};

export default UserContent;
