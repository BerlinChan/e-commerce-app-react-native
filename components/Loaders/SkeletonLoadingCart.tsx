import { View, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const SkeletonLoadingCart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            ...styles.placeholder,
            width: "35%",
            height: 90,
            marginRight: 10,
          }}
        />
        <View style={{ width: "50%" }}>
          <View
            style={{
              ...styles.placeholder,
              width: "100%",
              height: 15,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "90%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "50%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "60%",
              height: 20,
              marginTop: 5,
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            ...styles.placeholder,
            width: "35%",
            height: 90,
            marginRight: 10,
          }}
        />
        <View style={{ width: "50%" }}>
          <View
            style={{
              ...styles.placeholder,
              width: "100%",
              height: 15,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "90%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "50%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "60%",
              height: 20,
              marginTop: 5,
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            ...styles.placeholder,
            width: "35%",
            height: 90,
            marginRight: 10,
          }}
        />
        <View style={{ width: "50%" }}>
          <View
            style={{
              ...styles.placeholder,
              width: "100%",
              height: 15,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "90%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "50%",
              height: 15,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "60%",
              height: 20,
              marginTop: 5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    width: width,
    backgroundColor: "#fff",
    height: height,
  },

  placeholder: {
    backgroundColor: "#eeeeee",
    borderRadius: 5,
  },
  banner: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default SkeletonLoadingCart;
