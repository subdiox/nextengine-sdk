import Entity from "./Entity";

class User extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_login_user";
  }
}

export default User;
