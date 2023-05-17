import { forwardRef } from "react";
import { TextInputProps, TextInput } from "react-native";
import { useTheme } from "styled-components";
import { Container, Input, Label } from "./styles";

type Props = TextInputProps & {
  label: string;
};

const TextAreaInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme();
    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          multiline
          placeholderTextColor={COLORS.GRAY_400}
          autoCapitalize="sentences"
          {...rest}
        />
      </Container>
    );
  }
);

export { TextAreaInput };
