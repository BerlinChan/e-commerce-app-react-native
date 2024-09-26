import { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
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
import { useProfile } from "@/context/ProfileContext";
import { useNavigation } from "expo-router";

export const DetailScreen = ({ id }) => {
  const scrollY = new Animated.Value(0);
  const user = {};
  const [product, setProduct] = useState({});
  const [isFetching, setIsFething] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(Colors.lighter_green);
  //color
  const type = "green";
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const profile = useProfile();
  const isFavorite = profile.favorites.some((fav) => fav.id === product.id);
  const navigation = useNavigation();

  useEffect(() => {
    setColor(colorCheck(type));

    async function fetchData() {
      try {
        setIsFething(true);
        const response = await timeoutPromise(
          fetch(`${API_URL}/products/${id}`, {
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
  }, [id]);

  return (
    <View style={styles.container}>
      {showSnackbar && (
        <Snackbar checkVisible={showSnackbar} message={message} />
      )}
      <Header scrollY={scrollY} item={product} />

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
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 20 },
});
