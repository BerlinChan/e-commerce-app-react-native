import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "@/utils/Colors";
//Text
import CustomText from "@/components/UI/CustomText";
import { FavoriteItem } from "./FavoriteItem";
import Messages from "@/messages/user";
import { router } from "expo-router";
import { useProfile } from "@/context/ProfileContext";

export const FavoriteBody = ({ loadFavoriteProducts, isRefreshing }) => {
  const profile = useProfile();

  return (
    <>
      {!profile.id === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: Colors.lighter_green,
              borderRadius: 5,
              borderColor: Colors.lighter_green,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.navigate("SignUp")}>
              <CustomText style={{ color: "#fff" }}>Continue</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : profile.favorites.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            There are no products in your favorites.
          </CustomText>
          <CustomText style={{ fontSize: 16 }}>
            Start adding products!
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={FavoriteProducts}
          onRefresh={loadFavoriteProducts}
          refreshing={isRefreshing}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <FavoriteItem item={item} />;
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
