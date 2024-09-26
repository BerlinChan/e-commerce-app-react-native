import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageURISource,
} from "react-native";

const { height, width } = Dimensions.get("window");

type PropTypes = {
  imageUrl: ImageURISource;
};

export const Slide = ({ imageUrl }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          resizeMode: "contain",
          width: "90%",
          height: height / 2,
        }}
        source={imageUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    width,
    alignItems: "center",
  },
});
