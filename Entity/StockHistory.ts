import Entity from "./Entity";

class StockHistory extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_stockiohistory";
  }
}

export default StockHistory;
