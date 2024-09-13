import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, Text } from "react-native";
//Color
import Colors from "@/utils/Colors";
//Components
import Snackbar from "@/components/Notification/Snackbar";
import {
  Header,
  DetailBody,
  ActionButton,
  ModalComp,
  Comments,
} from "./components";
import { colorCheck, timeoutPromise } from "@/utils/Tools";
import { API_URL } from "@/utils/Config";

export const DetailScreen = (props) => {
  const scrollY = new Animated.Value(0);
  const user = {};
  const { item } = props.route.params;
  const [product, setProduct] = useState({});
  const [isFetching, setIsFething] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(Colors.lighter_green);
  //color
  const type = item.color;
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const isFavorite = [].some((fav) => fav.id === product.id);

  useEffect(() => {
    setColor(colorCheck(type));

    async function fetchData() {
      try {
        setIsFething(true);
        const response = await timeoutPromise(
          fetch(`${API_URL}/products/${item.id}`, {
            method: "GET",
          })
        );

        if (!response.ok) {
          throw new Error("Something went wrong!, can't get the products");
        }
        const resData = await response.json();
        setProduct(resData);
      } catch (err) {
        throw err;
      } finally {
        setIsFething(false);
      }
    }
    fetchData();
  }, [item]);

  return (
    <View style={styles.container}>
      {showSnackbar && (
        <Snackbar checkVisible={showSnackbar} message={message} />
      )}
      <Header navigation={props.navigation} scrollY={scrollY} item={product} />

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <DetailBody item={product} color={color} />
        <Comments />
      </Animated.ScrollView>
      <ActionButton
        item={product}
        isFavorite={isFavorite}
        setShowSnackbar={setShowSnackbar}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        user={user}
        color={color}
      />
      <ModalComp
        item={product}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 20 },
});
