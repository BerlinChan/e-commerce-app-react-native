import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
//Colors
import Colors from "@/utils/Colors";
//Components
import {
  Carousel,
  Header,
  CategorySection,
  FloatButton,
  categories,
} from "./components";
import Skeleton from "@/components/Loaders/SkeletonLoading";
import Snackbar from "@/components/Notification/Snackbar";
//FloatButton
import { Portal, Provider } from "react-native-paper";
import { timeoutPromise } from "@/utils/Tools";
import { API_URL } from "@/utils/Config";
import { useProfile } from "@/context/ProfileContext";

export const HomeScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  //Header Animation
  const scrollY = new Animated.Value(0);
  const profile = useProfile();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notification = {};

  //fetch Api
  useEffect(() => {
    // AsyncStorage.removeItem("isFirstTime");
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await timeoutPromise(
          fetch(`${API_URL}/products`, {
            method: "GET",
          })
        );

        if (!response.ok) {
          throw new Error("Something went wrong!, can't get the products");
        }
        const resData = await response.json();
        setProducts(resData);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          />
          <Portal>
            <FloatButton />
          </Portal>
          <Animated.FlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel />
              </View>
            )}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true }
            )}
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CategorySection
                name={item.name}
                bg={item.bg}
                data={products}
                navigation={navigation}
              />
            )}
          />
          {Object.keys(notification).length === 0 ? (
            <View />
          ) : (
            <Snackbar
              checkVisible={true}
              message={
                profile.id
                  ? notification + " " + profile.name.firstname
                  : notification
              }
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    width: "100%",
    marginTop: 50,
    paddingBottom: 20,
  },
});
