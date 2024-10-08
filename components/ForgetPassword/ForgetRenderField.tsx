import React from "react";
import { View, KeyboardTypeOptions } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import CustomText from "@/components/UI/CustomText";
//Colors
import Colors from "@/utils/Colors";

type Props = {
  icon: string;
  meta: { touched: boolean; error?: string; warning?: boolean };
  input: TextInputProps & { onChange: TextInputProps["onChangeText"] };
};

export default function ForgetRenderField({
  icon,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}: Props) {
  return (
    <View style={{ marginTop: 30 }}>
      <TextInput
        autoCapitalize="none"
        clearButtonMode="always"
        mode="outlined"
        selectionColor={Colors.leave_green}
        theme={{ colors: { primary: Colors.leave_green } }}
        left={
          <TextInput.Icon icon={icon} size={24} color={Colors.lighter_green} />
        }
        style={{ fontSize: 14 }}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && (
          <CustomText style={{ color: Colors.red }}>{error}</CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: Colors.yellow }}>{warning}</CustomText>
          )))}
    </View>
  );
}
