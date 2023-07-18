import Entity from "./Entity";

class GoodsCategory extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_goodscategory";
  }
}

export default GoodsCategory;
