import { Formik, FormikValues } from "formik";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import Button from "../../components/Form/Button";
import CategorySelect from "../../components/Form/CategorySelect";
import Input from "../../components/Form/Input";
import * as Yup from "yup";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import CategoryView, { Category } from "../CategoryView";

import Container, {
  TransactionsTypes,
  Title,
  Header,
  FormContent,
  Fields,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TransactionsData } from "../Dashboard";
import { TransactionType } from "../../components/TransactionCard";
import collections from "../../utils/collections";
import { useAuth } from "../../hooks/auth";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor deve ser positivo")
    .required("O valor é obrigatório"),
});

type NavigationProps = {
  navigate: (screen: string) => void;
};

const Register = () => {
  const { user } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const [category, setCategory] = useState<Category>({
    name: "category",
    label: "Categoria",
  });
  const [transaction, setTransaction] = useState<TransactionType>();
  const [categoryModal, setCategoryModal] = useState(false);

  const handleRegister = async (data: FormikValues, { resetForm }: any) => {
    if (!transaction) return Alert.alert("Selecione o tipo da transação");

    if (category.name === "category")
      return Alert.alert("Selecione uma categoria");

    const newData: TransactionsData = {
      name: data.name,
      type: transaction,
      amount: data.amount,
      category: category.name,
      id: uuid.v4().toString(),
      date: new Date().toString(),
    };

    try {
      if (user?.id) {
        const beforeData = await AsyncStorage.getItem(
          collections.transactions(user.id)
        );
        const parsedBeforeData = beforeData ? JSON.parse(beforeData) : [];
        const allData = [...parsedBeforeData, newData];

        await AsyncStorage.setItem(
          collections.transactions(user.id),
          JSON.stringify(allData)
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }

    setCategory({ label: "Categoria", name: "category" });
    setTransaction(undefined);
    resetForm();

    navigation.navigate("Listagem");
  };

  const handleCloseModal = () => {
    setCategoryModal(false);
  };

  const handleOpenModal = () => {
    setCategoryModal(true);
  };

  const handleTransactionTypeSelect = (type: TransactionType) => {
    type !== transaction && setTransaction(type);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Formik
          onSubmit={handleRegister}
          validationSchema={RegisterSchema}
          initialValues={{ name: "", amount: "" }}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <FormContent>
              <Fields>
                <Input
                  placeholder="Nome"
                  error={errors.name}
                  value={values.name}
                  autoCorrect={false}
                  touched={touched.name}
                  autoCapitalize="sentences"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />

                <Input
                  placeholder="Preço"
                  error={errors.amount}
                  value={values.amount}
                  keyboardType="numeric"
                  touched={touched.amount}
                  onBlur={handleBlur("amount")}
                  onChangeText={handleChange("amount")}
                />

                <TransactionsTypes>
                  <TransactionTypeButton
                    type="up"
                    title="Receber"
                    isActive={transaction === "positive"}
                    onPress={() => handleTransactionTypeSelect("positive")}
                  />

                  <TransactionTypeButton
                    type="down"
                    title="Pagar"
                    isActive={transaction === "negative"}
                    onPress={() => handleTransactionTypeSelect("negative")}
                  />
                </TransactionsTypes>

                <CategorySelect
                  testID="button-category"
                  title={category.label}
                  onPress={handleOpenModal}
                />
              </Fields>

              <Button title="Enviar" onPress={() => handleSubmit()} />
            </FormContent>
          )}
        </Formik>

        <Modal testID="modal-category" visible={categoryModal}>
          <CategoryView
            category={category}
            setCategory={setCategory}
            closeSelect={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
