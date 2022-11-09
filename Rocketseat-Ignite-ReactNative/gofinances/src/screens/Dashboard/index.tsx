import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import { format, getDate, getMonth } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard";

import TransactionCard, {
  TransactionCardData,
  TransactionType,
} from "../../components/TransactionCard";
import Container, {
  Header,
  Avatar,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  TransactionsHeader,
  TransactionsIcon,
  UserWrapper,
  LogoutIcon,
  HighlightCards,
  Transactions,
  Title,
  LogoutButton,
  TransactionsList,
  LoadContainer,
} from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import toBRL from "../../utils/toBRL";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import collections from "../../utils/collections";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../hooks/auth";

export interface TransactionsData extends TransactionCardData {
  id: string;
}

interface HighLightType {
  total: string;
  lastDate?: Date;
  firstDate?: Date;
}

interface HighLightData {
  entries: HighLightType;
  total: HighLightType;
  expensive: HighLightType;
}

const highLightInitialData = {
  total: { total: toBRL(0) },
  entries: { total: toBRL(0) },
  expensive: { total: toBRL(0) },
};

const getFilterDate = (
  transactions: TransactionsData[],
  position: "last" | "first",
  type?: TransactionType
): Date => {
  const filter = type
    ? transactions.filter((transaction) => transaction.type === type)
    : transactions;

  const onlyDates = filter.map(({ date }) => date);
  const newDate = onlyDates[position === "last" ? onlyDates.length - 1 : 0];

  return newDate ? new Date(newDate) : new Date();
};

const Dashboard = () => {
  const [transactionsData, setTransactionsData] =
    useState<TransactionsData[]>();
  const [highLightData, setHighLightData] =
    useState<HighLightData>(highLightInitialData);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  const getLastTransactionLabel = (type?: TransactionType) => {
    const lastEntry = highLightData.entries.lastDate;
    const lastExpensive = highLightData.expensive.lastDate;

    if (type) {
      const lastDate = type === "positive" ? lastEntry : lastExpensive;

      if (lastDate) {
        const day = getDate(lastDate);
        const label = type === "positive" ? "entrada" : "saída";
        const month = format(lastDate, "MMMM", { locale: ptBR });

        return `Última ${label} dia ${day} de ${month}.`;
      }

      return `Sem útimas ${
        type === "positive" ? "entradas" : "saídas"
      } armazenadas.`;
    }

    const totalFirstDate = highLightData.total.firstDate;
    const totalLastDate = highLightData.total.lastDate;

    if (totalFirstDate && totalLastDate) {
      const firstDate = getDate(totalFirstDate);
      const lastDate = getDate(totalLastDate);

      if (firstDate && lastDate)
        return `Entre ${firstDate} à ${lastDate} de abril`;
    }

    return "Sem transações armazenadas.";
  };

  const loadTransactions = async () => {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    if (user?.id) {
      const storageData = await AsyncStorage.getItem(
        collections.transactions(user.id)
      );

      if (storageData) {
        const parsedTransactions: TransactionsData[] = JSON.parse(storageData);

        if (parsedTransactions.length !== 0) {
          const formattedParsedTransactions = parsedTransactions.map(
            (transaction) => {
              const amountLabel = toBRL(transaction.amount);

              const dateLabel = format(
                new Date(transaction.date),
                "dd/MM/yyyy"
              );

              transaction.type === "positive"
                ? (entriesTotal += Number(transaction.amount))
                : (expensiveTotal += Number(transaction.amount));

              return { ...transaction, date: dateLabel, amount: amountLabel };
            }
          );

          setHighLightData({
            entries: {
              total: toBRL(entriesTotal),
              lastDate: getFilterDate(parsedTransactions, "last", "positive"),
              firstDate: getFilterDate(parsedTransactions, "first", "positive"),
            },
            expensive: {
              total: toBRL(expensiveTotal),
              lastDate: getFilterDate(parsedTransactions, "last", "negative"),
              firstDate: getFilterDate(parsedTransactions, "first", "negative"),
            },
            total: {
              total: toBRL(entriesTotal - expensiveTotal),
              lastDate: getFilterDate(parsedTransactions, "last"),
              firstDate: getFilterDate(parsedTransactions, "first"),
            },
          });

          setTransactionsData(formattedParsedTransactions);
        }
      }
    }

    if (isLoading === true) setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Avatar source={{ uri: user?.photo }} />

                <User>
                  <UserGreeting>Olá,</UserGreeting>

                  <UserName>{user?.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <LogoutIcon />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highLightData.entries.total}
              lastTransaction={getLastTransactionLabel("positive")}
            />

            <HighlightCard
              type="down"
              title="Saidas"
              amount={highLightData.expensive.total}
              lastTransaction={getLastTransactionLabel("negative")}
            />

            <HighlightCard
              title="Total"
              amount={highLightData.total.total}
              lastTransaction={getLastTransactionLabel()}
            />
          </HighlightCards>

          <Transactions>
            <TransactionsHeader>
              <Title>Listagem</Title>

              <BorderlessButton
                onPress={async () => {
                  await AsyncStorage.clear();
                  setHighLightData(highLightInitialData);
                  setTransactionsData(undefined);
                }}
              >
                <TransactionsIcon name="delete-forever" />
              </BorderlessButton>
            </TransactionsHeader>

            <TransactionsList
              data={transactionsData}
              renderItem={({ item }) => {
                const typedItem = item as TransactionCardData;
                return <TransactionCard data={typedItem} />;
              }}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
