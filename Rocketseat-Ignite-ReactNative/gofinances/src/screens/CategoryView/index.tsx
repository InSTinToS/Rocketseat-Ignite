import React from "react";

import { FlatList } from "react-native";
import Button from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Header,
  Category,
  Icon,
  Label,
  Separator,
  Footer,
} from "./styles";

export interface Category {
  name: string;
  label: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelect: () => void;
}

const CategoryView = ({ category, setCategory, closeSelect }: Props) => {
  return (
    <Container>
      <Header>
        <Title>{category.label}</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            isActive={category.name === item.name}
            onPress={() => {
              setCategory(item);
            }}
          >
            <Icon name={item.icon} />

            <Label>{item.label}</Label>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={() => closeSelect()} />
      </Footer>
    </Container>
  );
};

export default CategoryView;
