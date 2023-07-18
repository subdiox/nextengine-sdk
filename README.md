# node-nextengine

[![codecov](https://codecov.io/gh/Leko/node-nextengine/branch/master/graph/badge.svg)](https://codecov.io/gh/Leko/node-nextengine)

[![NPM](https://nodei.co/npm/next-engine.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/next-engine/)

A Nodejs wrapper for the Next Engine API [http://api.next-e.jp](http://api.next-e.jp)

## Installation

```
npm i -S next-engine
```

## Usage

please read [API Document](http://api.next-e.jp).

## Authorize

See [passport-nextengine](https://github.com/Leko/passport-nextengine) source and [demo application](https://github.com/Leko/passport-nextengine/tree/master/examples)

## Basic request

```js
import Nextengine from "next-engine";

const client = new Nextengine({
  clientId: "XXXXXXXXXX",
  clientSecret: "XXXXXXXXXX",
  accessToken: "XXXXXXXXXX",
  refreshToken: "XXXXXXXXXX",
});

client
  .request("/api_v1_receiveorder_base/count", {
    "receive_order_shop_id-eq": 1,
  })
  .then((res) => console.log("then:", res.count))
  .catch((e) => console.error("catch:", e));
```

### Note

We strongly recommended that **you don't use `request` method**.  
Because it depends strongly on v1 specification.  
Utility methods (`query -> get|count|getInBatches`, `create`, `update`, `upload`, `waitFor` and `uploadAndWaitFor`) are To reduce the dependency of v1.  
So please use utility methods as far as possible.

## Query utility

```js
// Query by path string(ex. /api_v1_receiveorder_base/count)
client
  .query("receiveorder_base")
  .where("receive_order_date", ">=", "2016-12-25 23:59:59")
  .count()
  .then((count) => console.log(count));

// Query by Entity object
import { ReceiveOrder } from "next-engine/Entity";
client
  .query(ReceiveOrder)
  .where("receive_order_id", "<>", 1)
  .count()
  .then((count) => console.log(count));

// Get records
import { Goods } from "next-engine/Entity";
client
  .query(Goods)
  .where("goods_id", "abc")
  .limit(500)
  .offset(350)
  .get()
  .then((results) => console.log(results));

// Get all records in batch
import { ReceiveOrder } from "next-engine/Entity";
client
  .query(ReceiveOrder)
  .limit(300)
  .getInBatches((partial) => console.log(partial))
  .then(() => console.log("Done"));
```

## Create / Update utility

```js
// Create shop
import { Shop } from "next-engine/Entity";
const opts = {
  data: `
    <?xml version="1.0" encoding="utf-8"?>
    <root>
      <shop>
        <shop_mall_id>1</shop_mall_id>
        <shop_name>楽天店</shop_name>
        <shop_abbreviated_name>raku</shop_abbreviated_name>
        <shop_tax_id>1</shop_tax_id>
        <shop_tax_calculation_sequence_id>1</shop_tax_calculation_sequence_id>
        <shop_currency_unit_id>1</shop_currency_unit_id>
      </shop>
    </root>
  `,
};

client.create(Shop, opts).then((res) => res.result);

// Update shop
import { Shop } from "next-engine/Entity";
const opts = {
  receive_order_id: 1,
  receive_order_last_modified_date: "2016/01/01 00:00:00",
  data: `
    <?xml version="1.0" encoding="utf-8"?>
    <root>
      <receiveorder_base>
        <receive_order_shop_cut_form_id>12345-6789</receive_order_shop_cut_form_id>
        <receive_order_date>2014-05-01 00:00:00</receive_order_date>
      </receiveorder_base>
      <receiveorder_row>
        <receive_order_row_no value="1">
          <receive_order_row_goods_name>テスト商品</receive_order_row_goods_name>
          <receive_order_row_cancel_flag>1</receive_order_row_cancel_flag>
        </receive_order_row_no>
        <receive_order_row_no value="2">
          <receive_order_row_goods_name>テスト商品2</receive_order_row_goods_name>
        </receive_order_row_no>
        <receive_order_row_no value="3">
          <receive_order_row_quantity>3</receive_order_row_quantity>
        </receive_order_row_no>
      </receiveorder_row>
    </root>
  `,
};

client.update(Shop, opts).then((res) => res.result);
```

## Upload / Queue utility

```js
import zlib from "zlib";
import promisify from "es6-promisify";
const stringify = promisify(require("csv-stringify"));
const deflate = promisify(zlib.deflate);
import { UploadQueue } from "next-engine/Entity";

input = [
  ["syohin_code", "jan_code"],
  ["abc", "1234567890"],
];
stringify(input)
  .then((csv) => deflate(csv))
  .then((gz) => client.upload({ data_type: "gz", data: gz }))
  .then((queueId) =>
    client.waitFor(queueId, [UploadQueue.COMPLETED, UploadQueue.FAILED])
  )
  .then(() => console.log("Imported!"));

// Or
input = [
  ["syohin_code", "jan_code"],
  ["abc", "1234567890"],
];
stringify(input)
  .then((csv) => deflate(csv))
  .then((gz) => client.uploadAndWaitFor({ data_type: "gz", data: gz }))
  .then(() => console.log("Imported!"));
```

## Contributing

1. Fork this repository
1. Create your feature branch & commit
1. Create a new pull request

## License

MIT
