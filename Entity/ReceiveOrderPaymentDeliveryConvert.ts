import Entity from "./Entity";

class ReceiveOrderPaymentDeliveryConvert extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_receiveorder_paymentdeliveryconvert";
  }
}

export default ReceiveOrderPaymentDeliveryConvert;
