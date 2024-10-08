import { View, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const Skeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View
          style={{
            ...styles.placeholder,
            width: "100%",
            height: 130,
          }}
        />
      </View>
      <View style={styles.text}>
        <View
          style={{
            ...styles.placeholder,
            width: "60%",
            height: 30,
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ width: "49%" }}>
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 95,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "80%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "30%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: "49%" }}>
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 95,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "80%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "30%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: "49%", marginTop: 15 }}>
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 95,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "80%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "30%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: "49%", marginTop: 15 }}>
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 95,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "80%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "30%",
              height: 20,
              marginTop: 5,
            }}
          />
          <View
            style={{
              ...styles.placeholder,
              width: "95%",
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
      </View>
      {height < 668 ? (
        <View />
      ) : (
        <View style={{ ...styles.text, marginTop: 10 }}>
          <View
            style={{
              ...styles.placeholder,
              width: "100%",
              height: 50,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    position: "absolute",
    width,
    backgroundColor: "#fff",
    height,
    marginTop: 80,
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
    paddingLeft: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default Skeleton;
