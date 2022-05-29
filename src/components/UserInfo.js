export class UserInfo {
  constructor(
    { name, about, avatar, _id },
    profileName,
    profileInfo,
    userAvatar
  ) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._id = _id;
    this.profileName = profileName;
    this.profileInfo = profileInfo;
    this.userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this.name,
      about: this.about,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._id = _id;
    this.profileName.textContent = name;
    this.profileInfo.textContent = about;
    this.userAvatar.style.backgroundImage = `url(${this.avatar})`;
  }
}
