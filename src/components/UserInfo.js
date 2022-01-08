export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }


  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
    this._avatar.src = info.avatar;
    this._id = info._id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
      id: this._id
    };
  }
}