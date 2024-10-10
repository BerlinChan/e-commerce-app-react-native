import { View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
//Colors
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  secureTextEntry?: boolean;
  icon?: string;
  showPass?: boolean;
  passIcon?: string;
  setShowPass?: React.Dispatch<React.SetStateAction<boolean>>;
  meta: { touched?: boolean; error?: string; warning?: boolean };
  input: TextInputProps & { onChange: TextInputProps["onChangeText"] };
};

export default function InputField({
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}: Props) {
  return (
    <View>
      <View>
        <TextInput
          autoCapitalize="none"
          mode="outlined"
          clearButtonMode={passIcon ? "never" : "always"}
          selectionColor={Colors.leave_green}
          theme={{ colors: { primary: Colors.leave_green } }}
          left={
            icon ? (
              <TextInput.Icon
                icon={icon}
                size={24}
                color={Colors.lighter_green}
                style={{ paddingRight: 10 }}
              />
            ) : null
          }
          style={{
            fontSize: 14,
            backgroundColor: "transparent",
            marginVertical: 5,
            // paddingHorizontal: 5,
          }}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {passIcon && (
          <MaterialCommunityIcons
            name={showPass ? "eye" : "eye-off"}
            size={24}
            color={Colors.lighter_green}
            onPress={() => {
              setShowPass?.((prev) => !prev);
            }}
            style={{
              position: "absolute",
              top: "30%",
              right: 10,
              zIndex: 100,
            }}
          />
        )}
      </View>
      {touched &&
        ((error && (
          <CustomText style={{ color: Colors.red, marginHorizontal: 15 }}>
            {error}
          </CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: Colors.yellow, marginHorizontal: 15 }}>
              {warning}
            </CustomText>
          )))}
    </View>
  );
}
