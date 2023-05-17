import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Content } from "./styles";
import { HeaderHome } from "../../components/HeaderHome";
import { CarStatus } from "../../components/CarStatus";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schema/Historic";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    } else {
      navigate("departure");
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert(
        "Veiculo em uso",
        "Não foi possível carregar o veiculo em uso."
      );
      console.log(error);
    }
  }

  useEffect(() => {
    realm.addListener("change", () => fetchVehicleInUse());
    return () => realm.removeListener("change", fetchVehicleInUse);
  }, []);

  return (
    <Container>
      <HeaderHome />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
