import React from 'react';
import BaseTopBar from 'src/components/baseComponent/BaseTopBar';
import { BsPlusCircleFill } from 'react-icons/bs';
import { VscHome, VscGraph } from 'react-icons/vsc';

const TopBar: React.FC<Props> = ({ canCreate }) => {
  return (
    <BaseTopBar>
      <VscHome />
      {canCreate && <BsPlusCircleFill color={'royalOrange.300'} />}
      <VscGraph />
    </BaseTopBar>
  );
};

type Props = {
  canCreate: boolean;
};

export default TopBar;
