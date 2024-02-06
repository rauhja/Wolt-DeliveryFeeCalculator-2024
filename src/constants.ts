interface RushHour {
  [key: number]: number[];
}

export const ADDITIONAL_DISTANCE = 500;
export const ADDITIONAL_DISTANCE_FEE = 1;
export const BASE_FEE = 2;
export const BASE_DISTANCE = 1000;
export const EXTRA_BULK_FEE = 1.2;
export const EXTRA_ITEM_FEE = 0.5;
export const FREE_DELIVERY_CART_VALUE = 200;
export const ITEMS_COUNT_FOR_BULK_FEE = 12;
export const ITEMS_WITHOUT_SURCHARGE = 4;
export const MAX_DELIVERY_FEE = 15;
export const MIN_ORDER_VALUE = 10;
export const RUSH_HOUR = { 5: [15, 16, 17, 18] } as RushHour;
export const RUSH_HOUR_MULTIPLIER = 1.2;
