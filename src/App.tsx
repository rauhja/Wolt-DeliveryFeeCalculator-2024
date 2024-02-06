import { FeeCalculator } from "./components/FeeCalculator";
import { GlobalStyle } from "./global";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import styled from "styled-components";

const Title = styled.h1`
  font-family: Omnes, system-ui, Roboto, Avenir, Helvetica, Arial, sans-serif;
  font-size: 3.2em;
  line-height: 1.1;
  color: "#202125";
  margin-bottom: 1.75rem;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Wrapper>
        <GlobalStyle />
        <Title>Delivery Fee Calculator</Title>
        <FeeCalculator />
      </Wrapper>
    </LocalizationProvider>
  );
}

export default App;
