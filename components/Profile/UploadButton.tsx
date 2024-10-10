import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/utils/Colors";
import { Button } from "react-native-paper";

type Props = {
  uploadButton?: boolean;
  setUploadButton: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  UploadProfile: () => Promise<void>;
};

const UploadButton = ({
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}: Props) => {
  return (
    <View style={styles.button}>
      <Button
        icon="camera"
        mode="contained"
        onPress={UploadProfile}
        disabled={uploadButton}
        style={{
          height: 50,
          justifyContent: "center",
          backgroundColor: Colors.leave_green,
        }}
      >
        Update Profile Picture
      </Button>
      {!uploadButton ? (
        <Button
          mode="contained"
          onPress={() => {
            setUploadButton(true);
            setImageUri("");
          }}
          disabled={uploadButton}
          style={{
            height: 50,
            marginTop: 10,
            justifyContent: "center",
            backgroundColor: Colors.leave_green,
          }}
        >
          Cancel
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
});

export default UploadButton;
