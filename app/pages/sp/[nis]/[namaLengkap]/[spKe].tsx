import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { SPLayout } from 'src/components/pageLayout';
import * as SPLetter from 'src/components/baseComponent/SPLetter';
import useCustomDebounce from 'src/utils/useCustomDebounce';

const SPPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const generateSP = () => {
    const spKe = Router.query.spKe as string;

    switch (spKe) {
      case '2':
        return <SPLetter.SP2 />;
      case '3':
        return <SPLetter.SP3 />;
      default:
        return <SPLetter.SP1 />;
    }
  };

  return <SPLayout>{isLoaded && generateSP()}</SPLayout>;
};

export default SPPage;
