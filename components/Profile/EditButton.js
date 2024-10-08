import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
// TODO: remove PropTypes check
import PropTypes from "prop-types";
import { router } from "expo-router";

export const EditButton = ({ user }) => {
  return (
    <View style={styles.editButton}>
      <TouchableOpacity
        onPress={() => router.navigate("/(profile)/profileEdit", { user })}
      >
        <FontAwesome5 name="user-edit" size={20} color={Colors.leave_green} />
      </TouchableOpacity>
    </View>
  );
};

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
