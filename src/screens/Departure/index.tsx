import React, { useRef } from "react";
import { TextInput } from "react-native";

import { HeaderDeparture } from "../../components/HeaderDeparture";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Button } from "../../components/Button";
import { Container, Content } from "./styles";

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  const handleDepartureRegister = () => {
    console.log("OK");
  };

  return (
    <Container>
      <HeaderDeparture title="Saída" />
      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />
        <TextAreaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
          blurOnSubmit
        />

        <Button title="Registrar Saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  );
}
