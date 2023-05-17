import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
};

export function HeaderDeparture({ title }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 32;
  const { goBack } = useNavigation();

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <Title>{title}</Title>
    </Container>
  );
}
