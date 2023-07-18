import Entity from "./Entity";

class Page extends Entity {
  static get getAsInfo() {
    return false;
  }
  static get path() {
    return "/api_v1_master_pagebase";
  }
}

export default Page;
