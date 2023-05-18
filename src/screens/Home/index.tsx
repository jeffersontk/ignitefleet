import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Label, Title } from "./styles";
import { HeaderHome } from "../../components/HeaderHome";
import { CarStatus } from "../../components/CarStatus";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schema/Historic";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );
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

  function fetchHistoric() {
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)"
    );
    const formattedHistoric = response.map((item) => {
      return {
        id: item._id!.toString(),
        licensePlate: item.license_plate,
        isSync: false,
        created: dayjs(item.created_at).format(
          "[Saida em] DD/MM/YYYY [às] HH:mm"
        ),
      };
    });

    setVehicleHistoric(formattedHistoric);
  }

  function handleHistoricDetails(id: string) {
    navigate("arrival", {
      id,
    });
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener("change", () => fetchVehicleInUse());
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicleInUse);
      }
    };
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HeaderHome />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
        <Title>Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item!.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum veículo utilizado</Label>}
        />
      </Content>
    </Container>
  );
}
