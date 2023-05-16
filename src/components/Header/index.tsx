import { SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme from "../../theme";

import { Container, Greeting, Message, Name, Picture } from "./styles";

export function Header() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleSignOut() {
    app.currentUser?.logOut();
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
        <SignOut size={32} color={theme.COLORS.GRAY_400} weight="fill" />
      </TouchableOpacity>
    </Container>
  );
}
