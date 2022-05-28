export class UserInfo {
  constructor({ userName, userInfo, userAvatar}) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._userAvatar = userAvatar
  }

  getUserInfo() {
    return (this.userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    });
  }

  setUserInfo({ ["user-name"]: userName, ["user-info"]: userInfo }) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userInfo;
  }
}
