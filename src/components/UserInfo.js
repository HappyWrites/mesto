export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const data = { name: this._name.textContent, about: this._about.textContent };
    return data;
  }

  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
  }
}