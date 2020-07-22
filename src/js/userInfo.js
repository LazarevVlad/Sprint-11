export default class UserInfo {
  constructor(userName, userJob, userInfoName, userInfoJob, avatar, api) {
    this.userName = userName;
    this.userJob = userJob;
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;
    this.avatar = avatar;
    this.api = api;
  }
  getUserProfile() {
    this.api
      .getUserInfo()
      .then((data) => {
        this.userInfoName.textContent = data.name;
        this.userInfoJob.textContent = data.about;
        this.avatar.style.backgroundImage = `url('${data.avatar}')`;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  setUserInfo() {
    this.api
      .getUserInfo()
      .then((data) => {
        this.userName.value = data.name;
        this.userJob.value = data.about;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  updateUserInfo(name, job) {
    this.userInfoName.textContent = name;
    this.userInfoJob.textContent = job;
  }
  updateUserAvatar(avatar) {
    this.avatar.style.backgroundImage = `url('${avatar}')`;
  }
}
