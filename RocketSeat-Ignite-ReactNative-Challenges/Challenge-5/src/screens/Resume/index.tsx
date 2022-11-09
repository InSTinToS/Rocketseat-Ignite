import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/core";
import { format } from "date-fns";
import { addMonths, subMonths } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import HistoryCard from "../../components/HistoryCard";
import { useAuth } from "../../hooks/auth";
import { categories } from "../../utils/categories";
import collections from "../../utils/collections";
import toBRL from "../../utils/toBRL";
import { TransactionsData } from "../Dashboard";
import { LoadContainer } from "../Dashboard/styles";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";

interface CategoriesTotal {
  label: string;
  total: number;
  color: string;
  percent: string;
  totalLabel: string;
}

const Resume = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const bottomTabBar = useBottomTabBarHeight();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoriesTotal, setCategoriesTotal] = useState<CategoriesTotal[]>([]);

  const handleSelectedDate = (action: "next" | "prev") => {
    if (action === "next") setSelectedDate(addMonths(selectedDate, 1));
    else setSelectedDate(subMonths(selectedDate, 1));

    setIsLoading(false);
  };

  const loadData = async () => {
    if (user?.id) {
      const newCategoriesTotal: CategoriesTotal[] = [];
      const res = await AsyncStorage.getItem(collections.transactions(user.id));
      const formattedRes: TransactionsData[] = res ? JSON.parse(res) : [];

      const expensives = formattedRes.filter(
        ({ type, date }) =>
          type === "negative" &&
          new Date(date).getMonth() === selectedDate.getMonth() &&
          new Date(date).getFullYear() === selectedDate.getFullYear()
      );

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((expensive) => {
          if (expensive.category === category.name)
            categorySum += Number(expensive.amount);
        });

        const expensivesTotal = expensives.reduce(
          (acc: number, expensive: TransactionsData) =>
            (acc += Number(expensive.amount)),
          0
        );

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        if (categorySum > 0)
          newCategoriesTotal.push({
            percent,
            total: categorySum,
            label: category.label,
            color: category.color,
            totalLabel: toBRL(categorySum),
          });
      });

      setCategoriesTotal(newCategoriesTotal);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: bottomTabBar,
          }}
        >
          <ChartContainer>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleSelectedDate("prev")}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </Month>

              <MonthSelectButton onPress={() => handleSelectedDate("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <VictoryPie
              labelRadius={50}
              colorScale={categoriesTotal.map(({ color }) => color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              data={categoriesTotal.map((category) => ({
                x: category.percent,
                y: category.total,
              }))}
            />
          </ChartContainer>

          {categoriesTotal.length !== 0 &&
            categoriesTotal.map((category) => (
              <HistoryCard
                key={category.label}
                color={category.color}
                title={category.label}
                amount={category.totalLabel}
              />
            ))}
        </Content>
      )}
    </Container>
  );
};

export default Resume;
