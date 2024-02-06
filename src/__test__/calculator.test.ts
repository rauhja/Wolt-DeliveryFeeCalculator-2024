import { describe, expect, it } from "@jest/globals";
import {
  calculateDeliveryFee,
  calculateSmallOrderFee,
  calculateFeeByDistance,
  calculateExtraItemFee,
  calculateRushHourFee,
  checkIfOverMaxDeliveryFee,
  checkIfEligibleForFreeDelivery,
} from "../utils/calculator";

const notRushHour = new Date("2021-01-01T10:00:00");
const rushHour = new Date("2024-01-19T15:00:01");

describe("calculateSmallOrderFee", () => {
  it("calculate small order fee when cart value under 10€", () => {
    expect(calculateSmallOrderFee(8.9)).toBeCloseTo(1.1, 2);
  });

  it("calculate small order fee when cart value over 10€", () => {
    expect(calculateSmallOrderFee(12)).toBe(0);
  });
  it("calculate small order fee when cart value 10€", () => {
    expect(calculateSmallOrderFee(10)).toBe(0);
  });
  it("calculate small order fee when cart value 0€", () => {
    expect(calculateSmallOrderFee(0)).toBe(10);
  });
});

describe("calculateFeeByDistance", () => {
  it("calculate fee by distance when distance is 1000", () => {
    expect(calculateFeeByDistance(1000)).toBe(0);
  });
  it("calculate fee by distance when distance is 1499", () => {
    expect(calculateFeeByDistance(1499)).toBe(1);
  });
  it("calculate fee by distance when distance is 1500", () => {
    expect(calculateFeeByDistance(1500)).toBe(1);
  });
  it("calculate fee by distance when distance is 1501", () => {
    expect(calculateFeeByDistance(1501)).toBe(2);
  });
  it("calculate fee by distance when distance is 999", () => {
    expect(calculateFeeByDistance(999)).toBe(0);
  });
});

describe("calculateExtraItemFee", () => {
  it("calculate extra item fee when item count is under 5", () => {
    expect(calculateExtraItemFee(4)).toBe(0);
  });
  it("calculate extra item fee when item count is 5", () => {
    expect(calculateExtraItemFee(5)).toBe(0.5);
  });
  it("calculate extra item fee when item count is over 5", () => {
    expect(calculateExtraItemFee(10)).toBe(3);
  });
  it("calculate extra item fee when item count is over 12", () => {
    expect(calculateExtraItemFee(13)).toBe(5.7);
  });
});

describe("calculateRushHourFee", () => {
  it("calculate rush hour fee when not rush hour", () => {
    expect(calculateRushHourFee(notRushHour)).toBe(1);
  });
  it("calculate rush hour fee when rush hour", () => {
    expect(calculateRushHourFee(rushHour)).toBe(1.2);
  });
});

describe("checkIfOverMaxDeliveryFee", () => {
  it("check if over max delivery fee when delivery fee is under 15€", () => {
    expect(checkIfOverMaxDeliveryFee(14)).toBe(14);
  });
  it("check if over max delivery fee when delivery fee is 15€", () => {
    expect(checkIfOverMaxDeliveryFee(15)).toBe(15);
  });
  it("check if over max delivery fee when delivery fee is over 15€", () => {
    expect(checkIfOverMaxDeliveryFee(15.1)).toBe(15);
  });
});

describe("checkIfEligibleForFreeDelivery", () => {
  it("check if eligible for free delivery when cart value is over 200€", () => {
    expect(checkIfEligibleForFreeDelivery(201)).toBe(true);
  });
  it("check if eligible for free delivery when cart value is 200€", () => {
    expect(checkIfEligibleForFreeDelivery(200)).toBe(true);
  });
  it("check if eligible for free delivery when cart value is under 200€", () => {
    expect(checkIfEligibleForFreeDelivery(199)).toBe(false);
  });
});

describe("calculateDeliveryFee", () => {
  it("calculate small order fee when cart value under 10€", () => {
    expect(
      calculateDeliveryFee({
        cartValue: 8.9,
        deliveryDistance: 0,
        itemCount: 1,
        deliveryTime: notRushHour,
      })
    ).toBeCloseTo(3.1, 2);
  });

  it("calculate small order fee when cart value under 10€ with Rush Hour", () => {
    expect(
      calculateDeliveryFee({
        cartValue: 8.9,
        deliveryDistance: 0,
        itemCount: 1,
        deliveryTime: rushHour,
      })
    ).toBeCloseTo(3.72, 2);
  });

  it("calculate for free delivery when cart value over 200€", () => {
    expect(
      calculateDeliveryFee({
        cartValue: 201,
        deliveryDistance: 0,
        itemCount: 1,
        deliveryTime: notRushHour,
      })
    ).toBe(0);
  });

  it("calculate extra item fee when item count is 13", () => {
    expect(
      calculateDeliveryFee({
        cartValue: 10,
        deliveryDistance: 0,
        itemCount: 13,
        deliveryTime: notRushHour,
      })
    ).toBeCloseTo(7.7, 2);
  });

  it("calculate max delivery fee", () => {
    expect(
      calculateDeliveryFee({
        cartValue: 100,
        deliveryDistance: 4501,
        itemCount: 15,
        deliveryTime: notRushHour,
      })
    ).toBe(15);
  });
});
