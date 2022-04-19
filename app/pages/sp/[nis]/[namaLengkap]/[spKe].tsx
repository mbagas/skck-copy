import React, { useEffect, useState } from 'react';
import { SPLayout } from 'src/components/pageLayout';
import SPLetter from 'src/components/baseComponent/SPLetter';

const SPPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return <SPLayout>{isLoaded && <SPLetter />}</SPLayout>;
};

export default SPPage;
