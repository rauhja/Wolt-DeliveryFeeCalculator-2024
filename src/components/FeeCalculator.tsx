import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { calculateDeliveryFee } from "../utils/calculator";
import { Button } from "./Button";
import { DateTimePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import ResetIcon from "../assets/reseticon.svg";

const Card = styled.div`
  padding: 2em;
  border: 1px solid;
  border-radius: 0.5em;
  border-color: #2021251f;
  background-color: #f6f6f6;
  box-shadow: 0 4px 12px 0 #2021250f;
`;
const DeliveryFeeCalculatorForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  min-height: 350px;
`;
const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-bottom: 1em;
`;

const DeliveryFeeResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
`;
const DeliveryFee = styled.p<{ $highlighted?: boolean }>`
  font-family: Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 2em;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ $highlighted }) => ($highlighted ? "#22bb33" : "#202125")};
  transition: color 0.1s ease-in-out;
  margin-bottom: 2em;
`;

const StyledDeliveryFee = styled.span`
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledResetIcon = styled.img`
  width: 56px;
  height: 56px;
  & circle {
    fill: red;
  }
`;

const ResetIconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  & circle {
    fill: red;
  }
`;

interface Errors {
  cartValue: string;
  deliveryDistance: string;
  numberOfItems: string;
  orderTime: string;
}

export const FeeCalculator = () => {
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [cartValue, setCartValue] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [orderTime, setOrderTime] = useState<Date>(new Date());
  const [highlightDeliveryPrice, setHighlightDeliveryPrice] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    cartValue: "",
    deliveryDistance: "",
    numberOfItems: "",
    orderTime: "",
  });

  const isValidPositiveNumber = (value: string): string | undefined => {
    if (value === "") return undefined;
    const newValue = value.replace(",", ".");
    if (!/^\d*\.?\d*$/.test(newValue)) {
      return "Please enter a valid number";
    }
    if (isNaN(parseFloat(newValue)) || parseFloat(newValue) <= 0) {
      return "Please enter a positive number";
    }
    return undefined;
  };

  const isValidPositiveInteger = (value: string): string | undefined => {
    if (value === "") return undefined;
    if (!/^\d+$/.test(value)) {
      return "Value must be a positive number and greater than 0";
    } else if (parseInt(value) <= 0) {
      return "Value must be a positive number and greater than 0";
    }
    return undefined;
  };

  const isInputEmpty = () => {
    const noErrors =
      !errors.cartValue &&
      !errors.deliveryDistance &&
      !errors.numberOfItems &&
      !errors.orderTime;
    return !cartValue || !deliveryDistance || !numberOfItems || !noErrors;
  };

  const handleCalculateDeliveryFee = (event: SyntheticEvent) => {
    event.preventDefault();
    const fee = calculateDeliveryFee({
      cartValue: Number(cartValue),
      deliveryDistance: Number(deliveryDistance),
      itemCount: Number(numberOfItems),
      deliveryTime: orderTime,
    });
    setDeliveryFee(fee);
    setHighlightDeliveryPrice(true);
    setIsCalculated(true);
  };

  const handleResetInputFields = () => {
    setCartValue("");
    setDeliveryDistance("");
    setNumberOfItems("");
    setOrderTime(new Date());
    setIsCalculated(false);
  };

  const handleCartValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleValueChange("cartValue", event.target.value, isValidPositiveNumber);
  };

  const handleDistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleValueChange(
      "deliveryDistance",
      event.target.value,
      isValidPositiveInteger
    );
  };

  const handleItemsAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleValueChange(
      "numberOfItems",
      event.target.value,
      isValidPositiveInteger
    );
  };

  const handleValueChange = (
    field: keyof typeof errors,
    value: string,
    validator: (value: string) => string | undefined
  ) => {
    switch (field) {
      case "cartValue":
        const newValue = value.replace(",", ".");
        setCartValue(newValue);
        break;
      case "deliveryDistance":
        setDeliveryDistance(value);
        break;
      case "numberOfItems":
        setNumberOfItems(value);
        break;
      default:
        break;
    }

    const errorMessage = validator(value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const isValidOrderTime = (selectedTime: Date): string | undefined => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    if (selectedTime <= now) {
      return "Order time cannot be in the past.";
    }
    return undefined;
  };

  const handleDateTimeChange = (newOrderTime: Date | null) => {
    if (!newOrderTime) return;

    const errorMessage = isValidOrderTime(newOrderTime);
    setOrderTime(newOrderTime);
    setErrors((prevErrors) => ({
      ...prevErrors,
      orderTime: errorMessage ?? "",
    }));
  };

  useEffect(() => {
    if (highlightDeliveryPrice) {
      const timer = setTimeout(() => {
        setHighlightDeliveryPrice(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return;
  }, [highlightDeliveryPrice]);

  return (
    <Card>
      {!isCalculated && (
        <DeliveryFeeCalculatorForm onSubmit={handleCalculateDeliveryFee}>
          <InputFields>
            <TextField
              required
              id="cartValue"
              name="cartValue"
              label="Cart value"
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              inputProps={{ "data-test-id": "cartValue" }}
              onChange={handleCartValueChange}
              error={!!errors.cartValue}
              helperText={errors.cartValue}
              autoComplete="off"
            />
            <TextField
              required
              id="deliveryDistance"
              name="deliveryDistance"
              label="Delivery distance"
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              inputProps={{ "data-test-id": "deliveryDistance" }}
              onChange={handleDistanceChange}
              autoComplete="off"
              error={!!errors.deliveryDistance}
              helperText={errors.deliveryDistance}
            />
            <TextField
              required
              id="numberOfItems"
              name="numberOfItems"
              label="Number of items"
              inputProps={{ "data-test-id": "numberOfItems" }}
              onChange={handleItemsAmountChange}
              autoComplete="off"
              error={!!errors.numberOfItems}
              helperText={errors.numberOfItems}
            />
            <DateTimePicker
              name="orderTime"
              label="Delivery time"
              value={orderTime}
              onChange={handleDateTimeChange}
              timeSteps={{ minutes: 1 }}
              referenceDate={orderTime}
              minDateTime={new Date()}
              slotProps={{
                textField: {
                  error: !!errors.orderTime,
                  helperText: errors.orderTime,
                  inputProps: { "data-test-id": "orderTime" },
                },
              }}
            />
          </InputFields>
          <ButtonRow>
            <Button
              label={"Calculate delivery fee"}
              type={"submit"}
              disabled={isInputEmpty()}
              dataTestId={"calculateButton"}
              ariaLabel={"Calculate delivery fee"}
            />
          </ButtonRow>
        </DeliveryFeeCalculatorForm>
      )}
      {isCalculated && (
        <DeliveryFeeResult>
          <DeliveryFee $highlighted={highlightDeliveryPrice}>
            Delivery price:{" "}
            <StyledDeliveryFee data-test-id="fee">
              {deliveryFee.toPrecision(3)}€
            </StyledDeliveryFee>
          </DeliveryFee>
          <ResetIconButton
            onClick={handleResetInputFields}
            aria-label="Reset input fields"
            data-test-id="resetButton"
          >
            <StyledResetIcon src={ResetIcon} />
          </ResetIconButton>
        </DeliveryFeeResult>
      )}
    </Card>
  );
};
