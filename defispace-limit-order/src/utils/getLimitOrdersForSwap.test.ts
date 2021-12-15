import getLimitOrdersForSwap from "./getLimitOrdersForSwap";

const SWAP_RATE = 3;

describe(`getting limit orders for swap with rate: ${SWAP_RATE}`, () => {
  test("with [] and amount:10 => available 0 limit order, 0 swap", () => {
    expect(getLimitOrdersForSwap([], SWAP_RATE, 10)).toEqual([]);
  });

  // 2 + 1.5 + 0.2 > 3 + 1.5 + 0.2
  // 3.7 > 4.7
  test("with {a:1,p:2} and amount:1 => available 1 limit order, 0 swap", () => {
    expect(
      getLimitOrdersForSwap([{amount: 1, price: 2}], SWAP_RATE, 1),
    ).toEqual([{amount: 1, price: 2}]);
  });

  // (2 + 1.5 + 0.2) + (3 + 1.5 + 0.2) > 2 * 3 + 1.5 + 0.2
  // 8.4 > 7.7
  test("with {a:1,p:2} and amount:2 => available 0 limit order, 2 swap", () => {
    expect(
      getLimitOrdersForSwap([{amount: 1, price: 2}], SWAP_RATE, 2),
    ).toEqual([]);
  });

  // (2 + 1.5 + 0.2) + (2 + 1.5 + 0.2) < 2 * 3 + 1.5 + 0.2
  // 7.4 < 7.7
  test("with {a:1,p:2},{a:1,p:2} and amount:2 => available 2 limit orders, 0 swap", () => {
    expect(
      getLimitOrdersForSwap(
        [
          {amount: 1, price: 2},
          {amount: 1, price: 2},
        ],
        SWAP_RATE,
        2,
      ),
    ).toEqual([
      {amount: 1, price: 2},
      {amount: 1, price: 2},
    ]);
  });

  // (1 + 1.5 + 0.2) + (2 + 1.5 + 0.2) + (2 + 1.5 + 0.2) < 6 * 3 + 1.5 + 0.2
  // 16.4 < 19.7
  test("with {a:1,p:1},{a:1,p:2},{a:1,p:2} and amount:6 => available 1 limit order, 5 swap", () => {
    expect(
      getLimitOrdersForSwap(
        [
          {amount: 1, price: 1},
          {amount: 1, price: 2},
          {amount: 1, price: 2},
        ],
        SWAP_RATE,
        6,
      ),
    ).toEqual([{amount: 1, price: 1}]);
  });

  // 2 * 2 + 1.5 + 0.2 < 2 * 3 + 1.5 + 0.2
  // 5.7 < 7.7
  test("with {a:10,p:2} and amount:2 => 1 limit order, 0 swap", () => {
    expect(
      getLimitOrdersForSwap([{amount: 10, price: 2}], SWAP_RATE, 2),
    ).toEqual([{amount: 2, price: 2}]);
  });

  // 1 * 2 + (1.5 + 0.2) + 4 * 2 + (1.5 + 0.2) < 5 * 3 + 1.5 + 0.2
  // 13.39 < 16.7
  test("with {a:1,p:2},{a:10,p:2} and amount:5 => 2 limit order, 0 swap", () => {
    try {
      expect(
        getLimitOrdersForSwap(
          [
            {amount: 1, price: 2},
            {amount: 10, price: 2},
          ],
          SWAP_RATE,
          5,
        ),
      ).toEqual([
        {amount: 1, price: 2},
        {amount: 4, price: 2},
      ]);
    } catch {
      expect(
        getLimitOrdersForSwap(
          [
            {amount: 1, price: 2},
            {amount: 10, price: 2},
          ],
          SWAP_RATE,
          5,
        ),
      ).toEqual([{amount: 5, price: 2}]);
    }
  });

  // 2.5 * 2 + 1.5 + 0.2 < 2 * 3 + 1.5 + 0.2
  // (2.5 * 0.5 + 1.5 + 0.2) + (2.5 * 1.5 + 1.5 + 0.2) > 2 * 3 + 1.5 + 0.2
  // 6.7 < 7.7
  // 8.4 > 7.7
  test("with {a:.5,p:2.5},{a:2,p:2.5} and amount:2 => 1 limit order, 0 swap", () => {
    expect(
      getLimitOrdersForSwap(
        [
          {amount: 0.5, price: 2.5},
          {amount: 2, price: 2.5},
        ],
        SWAP_RATE,
        2,
      ),
    ).toEqual([{amount: 2, price: 2.5}]);
  });
});
