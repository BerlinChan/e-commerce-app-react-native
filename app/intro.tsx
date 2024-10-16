import { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { Slide, SubSlide, Ticker, Pagination } from "@/components/intro";
import slides from "@/mock/introSlides";
import { useRootNavigationState, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function IntroScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollClick = useRef(null);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (rootNavigationState?.key) {
      (async function () {
        const skipIntro = (await AsyncStorage.getItem("skipIntro")) === "true";
        if (skipIntro) {
          router.navigate("/(drawer)/(tabs)/(homeTab)");
        }
      })();
    }
  }, [rootNavigationState?.key]);

  const backgroundColor = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: ["#BFEAF5", "#BEECC4", "#FFE4D9"],
    extrapolate: "clamp",
  });
  const textTranslate = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, width * -1, width * -2],
    extrapolate: "clamp",
  });

  const enterApp = async () => {
    AsyncStorage.setItem("skipIntro", "true");
    router.navigate("/(drawer)/(tabs)/(homeTab)");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Ticker scrollX={scrollX} />
        <Animated.ScrollView
          ref={scrollClick}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          {slides.map((slide) => {
            return <Slide key={slide.id} imageUrl={slide.imageUrl} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Pagination slides={slides} scrollX={scrollX} />
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
        />
        <Animated.View style={styles.footerContent}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: textTranslate }],
            }}
          >
            {slides.map(({ subtitle, des }, index) => {
              return (
                <SubSlide
                  key={subtitle}
                  last={index === slides.length - 1}
                  enterApp={enterApp}
                  subtitle={subtitle}
                  des={des}
                  nextSlide={() => {
                    if (scrollClick.current) {
                      scrollClick.current.scrollTo({
                        x: width * (index + 1),
                      });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  slider: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    height: 0.61 * height,
    borderBottomEndRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    borderTopLeftRadius: 75,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
});
