import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { CarStatus } from "../../components/CarStatus";

export function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMovement() {
    console.log("vai carai");
    navigate("departure");
  }

  return (
    <Container>
      <Header />
      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}
