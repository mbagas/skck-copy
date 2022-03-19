/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { toast, ToastOptions } from 'react-toastify';

export const errorToastfier = (err: any) => {
  const response = err.response?.data;
  const errObj = response?.errors;

  if (errObj) {
    _.forEach(errObj, (error) => {
      toast.error(`${error}`);
    });

    return;
  }

  toast.error(response?.message || 'Silahkan coba lagi!');
};

export const toastfier = (message: string, options: ToastOptions = {}) => toast(message, options);
