import CommonFunctions from '../../utils/CommonFunctions';

export const login = (
  payload: any,
  successCallback: Function,
  failureCallback: Function,
) => {
  return (dispatch: Function) => {
    CommonFunctions.signInWithPhoneNumber(
      payload.phoneNo,
      payload.countryCode,
      (confirmation: any) => {
        dispatch({type: 'Auth/login', payload: payload});
        successCallback(confirmation);
      },
      (error: any) => {
        failureCallback(error);
      },
    );
  };
};

export const getUID = (
  otp: string,
  confirm: any,
  successCallback: Function,
  failureCallback: Function,
) => {
  return (dispatch: Function) => {
    CommonFunctions.confirmCode(
      confirm,
      otp,
      (userDetails: any) => {
        dispatch({
          type: 'Auth/storeUID',
          payload: userDetails?.user?._user?.uid,
        });
        successCallback(userDetails);
      },
      (error: any) => {
        failureCallback(error);
      },
    );
  };
};
