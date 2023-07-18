import Entity from "./Entity";

class CreditApprovalType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_creditapprovaltype";
  }
}

export default CreditApprovalType;
