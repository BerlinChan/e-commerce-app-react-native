// Import react
import { useRef, useState } from "react";
// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
//icon
import { Ionicons } from "@expo/vector-icons";
//Colors
import Colors from "@/utils/Colors";
//Search Item component
import SearchItem from "./SearchItem";
import { Easing } from "react-native-reanimated";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
// Calculate window size
const { width, height } = Dimensions.get("window");

export function Header(props) {
  const [isFocused, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [productsFilter, setProductsFilter] = useState([]);
  const inputRef = useRef(null);

  const _input_box_translate_x = useRef(new Animated.Value(width)).current;
  const _back_button_opacity = useRef(new Animated.Value(0)).current;
  const _content_translate_y = useRef(new Animated.Value(height)).current;
  const _content_opacity = useRef(new Animated.Value(0)).current;

  const scrollY = props.scrollPoint;
  const headerPlatform = 50;
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: "clamp",
  });
  const _diff_clamp_scroll_y = Animated.diffClamp(
    clampedScrollY,
    0,
    headerPlatform
  );
  const _header_translate_y = _diff_clamp_scroll_y.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [0, -headerPlatform],
    extrapolate: "clamp",
  });
  const _header_opacity = _diff_clamp_scroll_y.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  // const ViewPlatForm = Platform.OS === "android" ? SafeAreaView : View;

  const searchFilterFunction = (searchText) => {
    const data = props.products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setKeyword(searchText);
    setProductsFilter(data);
  };

  const _onFocus = () => {
    // update state
    setIsFocus(true);
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    // run animation
    Animated.timing(
      _input_box_translate_x,
      input_box_translate_x_config
    ).start();
    Animated.timing(_back_button_opacity, back_button_opacity_config).start();
    Animated.timing(_content_translate_y, content_translate_y_config).start();
    Animated.timing(_content_opacity, content_opacity_config).start();
    // force focus
    inputRef.current.focus();
  };
  const _onBlur = () => {
    // update state
    setIsFocus(false);
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 50,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    // run animation
    Animated.timing(
      _input_box_translate_x,
      input_box_translate_x_config
    ).start();
    Animated.timing(_back_button_opacity, back_button_opacity_config).start();
    Animated.timing(_content_translate_y, content_translate_y_config).start();
    Animated.timing(_content_opacity, content_opacity_config).start();
    // force blur
    inputRef.current.blur();
  };

  return (
    <>
      <SafeAreaView style={{ ...styles.header_safe_area, ...props.style }}>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [
                {
                  translateY: _header_translate_y,
                },
              ],
              opacity: _header_opacity,
            },
          ]}
        >
          <View style={styles.header_inner}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Ionicons
                name="menu-outline"
                size={30}
                color={Colors.lighter_green}
              />
            </TouchableOpacity>
            <View>
              <Image
                source={require("@/assets/images/logoNoText.png")}
                style={{
                  width: height < 668 ? 130 : 120,
                  resizeMode: "contain",
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              underlayColor={"#ccd0d5"}
              onPress={_onFocus}
              style={styles.search_icon_box}
            >
              <Ionicons name="search" size={20} color={Colors.white} />
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.input_box,
                { transform: [{ translateX: _input_box_translate_x }] },
              ]}
            >
              <Animated.View style={{ opacity: _back_button_opacity }}>
                <TouchableOpacity
                  activeOpacity={1}
                  underlayColor={"#ccd0d5"}
                  onPress={_onBlur}
                  style={styles.back_icon_box}
                >
                  <Ionicons
                    name="arrow-back-outline"
                    size={25}
                    color={Colors.light_green}
                  />
                </TouchableOpacity>
              </Animated.View>
              <TextInput
                ref={inputRef}
                placeholder="Search for products"
                clearButtonMode="always"
                value={keyword}
                onChangeText={(value) => searchFilterFunction(value)}
                style={styles.input}
              />
            </Animated.View>
          </View>
        </Animated.View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: _content_opacity,
            transform: [{ translateY: _content_translate_y }],
          },
        ]}
      >
        <View style={styles.content_safe_area}>
          {keyword === "" ? (
            <View style={styles.image_placeholder_container}>
              <Image
                source={require("@/assets/images/logo1.png")}
                style={styles.image_placeholder}
              />
              <Text style={styles.image_placeholder_text}>
                Enter keywords to search :D
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 20,
                marginTop:
                  Platform.OS === "android" ? 0 : height < 668 ? 0 : 60,
              }}
            >
              {productsFilter.length === 0 ? (
                <Text style={styles.image_placeholder_text}>
                  No products found
                </Text>
              ) : (
                <FlatList
                  data={productsFilter}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <SearchItem item={item} navigation={props.navigation} />
                    );
                  }}
                />
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    position: "absolute",
    backgroundColor: Colors.white,
    width,
    height: 50,
    top:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : height > 736
        ? 40
        : 20,
  },
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: Colors.lighter_green,
    borderWidth: 1,
    borderColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.white,
    width: width,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    width: width,
    height: height,
    position: "absolute",
    left: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 80 : 40,
    paddingBottom: 80,
    backgroundColor: Colors.white,
  },
  content_inner: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
  image_placeholder_container: {
    flexDirection: "column",
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  image_placeholder_text: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
  },
  search_item: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e4eb",
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});
