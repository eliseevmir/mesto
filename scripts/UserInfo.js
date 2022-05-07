export class UserInfo {
  constructor ({userName, userInfo}) {
    this._userName = userName;
    this._userInfo = userInfo;
  };

  getUserInfo() {
   return this.userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
  };

  setUserInfo(dataForm) {
    this._userName.textContent = dataForm[0].value;
    this._userInfo.textContent = dataForm[1].value;
  };
};
