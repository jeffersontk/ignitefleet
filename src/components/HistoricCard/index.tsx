import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Check, Clock } from "phosphor-react-native";
import { Container, Departure, Info, LicensePlate } from "./styles";
import { useTheme } from "styled-components";

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
};

type Props = TouchableOpacityProps & {
  data: HistoricCardProps;
};

export function HistoricCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.created}</Departure>
      </Info>
      {data.isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <Clock size={24} color={COLORS.GRAY_400} />
      )}
    </Container>
  );
}
