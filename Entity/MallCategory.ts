import Entity from "./Entity";

class MallCategory extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_system_mallcategory";
  }
}

export default MallCategory;
