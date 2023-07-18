import Entity from "./Entity";

class GoodsWholesale extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_goodswholesale";
  }
}

export default GoodsWholesale;
