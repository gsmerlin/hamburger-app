import * as React from "react";
import { BurgerContext } from "../../../../../context/burger-context";
import { Label, MainDiv, MoreOrLess } from "./style";

interface Props {
  label: string;
}

// Add/remove button instance.
const BuildControl: React.FC<Props> = (props) => {
  const { label } = props;
  const { getAmt, addIng, delIng } = React.useContext(BurgerContext);
  const amount = getAmt(label);

  return (
    <MainDiv>
      <Label>{label}</Label>
      <MoreOrLess
        className="Less"
        onClick={() => delIng(label)}
        disabled={amount === 0}
      >
        Less
      </MoreOrLess>
      <MoreOrLess className="More" onClick={() => addIng(label)}>
        More
      </MoreOrLess>
    </MainDiv>
  );
};

export default BuildControl;
