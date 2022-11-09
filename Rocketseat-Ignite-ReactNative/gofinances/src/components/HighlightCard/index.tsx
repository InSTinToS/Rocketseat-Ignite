import React from "react";

import Container, {
  Header,
  Amount,
  Footer,
  Icon,
  LastTransaction,
  Title,
} from "./styles";

export type CardTypes = "up" | "down" | "total";

interface Props {
  title: string;
  amount: string;
  type?: CardTypes;
  lastTransaction: string;
}

const icon = {
  total: "dollar-sign",
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const HighlightCard = ({
  amount,
  title,
  lastTransaction,
  type = "total",
}: Props) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>

        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>

        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HighlightCard;
