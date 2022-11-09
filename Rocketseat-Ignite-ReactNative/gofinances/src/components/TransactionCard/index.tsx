import React from "react";
import { categories } from "../../utils/categories";

import Container, {
  Amount,
  Title,
  Icon,
  Category,
  CategoryName,
  Date,
  Footer,
} from "./styles";

interface Category {
  label: string;
  icon: string;
}

export type TransactionType = "positive" | "negative";

export interface TransactionCardData {
  name: string;
  date: string;
  amount: string;
  category: string;
  type: TransactionType;
}

interface Props {
  data: TransactionCardData;
}

const TransactionCard = ({
  data: { date, name, amount, category, type },
}: Props) => {
  const { icon, label } = categories.filter(
    (item) => item.name === category
  )[0];

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === "negative" && "- "}

        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={icon} />

          <CategoryName>{label}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
