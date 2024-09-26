import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
//Redux
// import { useSelector, useDispatch } from "react-redux";
//Action
// import { fetchFavorite } from "../../reducers";
//Component
import { Header, FavoriteBody } from "@/components/favoriteTab";
import Colors from "@/utils/Colors";
//Loader
import SkeletonLoadingCart from "@/components/Loaders/SkeletonLoadingCart";
import { useProfile } from "@/context/ProfileContext";

export default function FavoriteScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { profile } = useProfile();
  // const dispatch = useDispatch();

  const loadFavoriteProducts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // await dispatch(fetchFavorite());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing]);
  useEffect(() => {
    loadFavoriteProducts();
  }, [profile.id]);

  return (
    <View style={styles.container}>
      <Header />
      {profile.loading ? (
        <SkeletonLoadingCart />
      ) : (
        <FavoriteBody
          loadFavoriteProducts={loadFavoriteProducts}
          isRefreshing={isRefreshing}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
