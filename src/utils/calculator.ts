import * as Constants from "../constants";

interface DeliveryFeeProps {
  cartValue: number;
  deliveryDistance: number;
  itemCount: number;
  deliveryTime: Date;
}

export const calculateDeliveryFee = ({
  cartValue,
  deliveryDistance,
  itemCount,
  deliveryTime,
}: DeliveryFeeProps): number => {
  if (checkIfEligibleForFreeDelivery(cartValue)) return 0;

  let deliveryFee =
    (Constants.BASE_FEE +
      calculateSmallOrderFee(cartValue) +
      calculateFeeByDistance(deliveryDistance) +
      calculateExtraItemFee(itemCount)) *
    calculateRushHourFee(deliveryTime);

  deliveryFee = checkIfOverMaxDeliveryFee(deliveryFee);
  return deliveryFee;
};

export const calculateSmallOrderFee = (cartValue: number): number => {
  return Math.max(Constants.MIN_ORDER_VALUE - cartValue, 0);
};

export const calculateFeeByDistance = (deliveryDistance: number): number => {
  const extraDistance = Math.max(deliveryDistance - Constants.BASE_DISTANCE, 0);
  const extraDistanceFee =
    Math.ceil(extraDistance / Constants.ADDITIONAL_DISTANCE) *
    Constants.ADDITIONAL_DISTANCE_FEE;

  return extraDistanceFee;
};

export const calculateExtraItemFee = (itemCount: number): number => {
  const extraItems = Math.max(itemCount - Constants.ITEMS_WITHOUT_SURCHARGE, 0);
  let extraItemsFee = extraItems * Constants.EXTRA_ITEM_FEE;

  if (itemCount > Constants.ITEMS_COUNT_FOR_BULK_FEE) {
    extraItemsFee += Constants.EXTRA_BULK_FEE;
  }

  return extraItemsFee;
};

export const calculateRushHourFee = (deliveryTime: Date): number => {
  const dayOfWeek = deliveryTime.getDay();
  const hour = deliveryTime.getHours();

  if (
    Constants.RUSH_HOUR[dayOfWeek] &&
    Constants.RUSH_HOUR[dayOfWeek].includes(hour)
  ) {
    return Constants.RUSH_HOUR_MULTIPLIER;
  }
  return 1;
};

export const checkIfOverMaxDeliveryFee = (deliveryFee: number): number =>
  deliveryFee > Constants.MAX_DELIVERY_FEE
    ? Constants.MAX_DELIVERY_FEE
    : deliveryFee;

export const checkIfEligibleForFreeDelivery = (cartValue: number): boolean =>
  cartValue >= Constants.FREE_DELIVERY_CART_VALUE;
