import Entity from "./Entity";

class Company extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_login_company";
  }
}

export default Company;
