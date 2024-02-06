import styled from "styled-components";

interface ButtonProps {
  type: "button" | "submit";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  dataTestId: string;
  ariaLabel: string;
}

const ButtonStyle = styled.button`
  min-height: 56px;
  border-radius: 4px;
  border: 1px solid;
  padding: 1em;
  font-size: 1em;
  font-weight: 500;
  font-family: Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  background-color: #009de0;
  border-color: #009de0a3;
  color: #ffffff;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    border-color: #009de0a3;
    box-shadow: 0 4px 12px 0 #2021250f;
    background-color: #009de0eb;
  }
  &:disabled {
    color: #ffffff;
    background-color: #009de0a3;
  }
  &:active {
    background-color: #009de0d6;
  }

  &:focus {
    outline: 2px solid #0f2594;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.8em;
  }
`;

export const Button = ({
  type,
  label,
  onClick,
  disabled,
  dataTestId,
  ariaLabel,
}: ButtonProps) => {
  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-test-id={dataTestId}
      aria-label={ariaLabel}
    >
      {label}
    </ButtonStyle>
  );
};
