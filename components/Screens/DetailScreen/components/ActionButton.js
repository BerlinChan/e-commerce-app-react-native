import { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
//import CustomText
import CustomText from "@/components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
//Animatable
import * as Animatable from "react-native-animatable";
import Messages from "@/messages/user";
import { useProfile, useProfileDispatch } from "@/context/ProfileContext";

//PropTypes check
import PropTypes from "prop-types";

export const ActionButton = ({
  item,
  color,
  setShowSnackbar,
  isFavorite,
  setModalVisible,
  setMessage,
}) => {
  const cartLoading = false;
  const unmounted = useRef(false);
  const profile = useProfile();
  const profileDispatch = useProfileDispatch();

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  //Set Colors
  const addToCartAct = async () => {
    if (!profile.id) {
      setMessage(Messages["user.login.require"]);
      setShowSnackbar(true);
    } else {
      try {
        profileDispatch({ type: "ADD_TO_CART", payload: item });
        setModalVisible(true);
      } catch (err) {
        throw err;
      }
    }
  };
  const toggleFavorite = () => {
    if (!profile.id) {
      setMessage(Messages["user.login.require"]);
      setShowSnackbar(true);
    } else if (isFavorite) {
      Alert.alert(
        "Remove from favorites",
        "Do you want to remove the product from favorites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Agree",
            onPress: () => {
              profileDispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
            },
          },
        ]
      );
    } else {
      profileDispatch({ type: "ADD_TO_FAVORITES", payload: item });
    }
  };

  return (
    <Animatable.View
      delay={1500}
      animation="fadeInUp"
      style={styles.actionContainer}
    >
      <View style={styles.action}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={[styles.favorite, { borderColor: color }]}
        >
          {isFavorite ? (
            <LottieView
              source={require("@/components/IconAnimation/heart.json")}
              style={{ width: "100%", height: "100%" }}
              autoPlay={isFavorite}
              loop={false}
            />
          ) : (
            <Ionicons name="heart-outline" size={27} color={color} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addCart, { backgroundColor: color }]}
          onPress={addToCartAct}
        >
          {cartLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomText style={styles.actionText}>Add to cart</CustomText>
          )}
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

ActionButton.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  setShowSnackbar: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  addCart: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
  },
  favorite: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    paddingTop: 5,
    borderRadius: 5,
    height: 50,
  },
  actionText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },
});
