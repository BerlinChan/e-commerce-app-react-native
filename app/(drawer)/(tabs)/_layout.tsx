import Colors from "@/utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useCart } from "@/context/CartContext";
export default function Index() {
  const { cart } = useCart();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          const color = focused ? Colors.lighter_green : Colors.grey;
          if (route.name === "(homeTab)") {
            iconName = "home";
          } else if (route.name === "favoriteTab") {
            iconName = "hearto";
          } else if (route.name === "(cartTab)") {
            iconName = "shoppingcart";
          }
          return <AntDesign name={iconName} size={23} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: Colors.light_grey,
          height: 75,
          justifyContent: "center",
        },
        tabBarActiveTintColor: Colors.lighter_green,
        tabBarInactiveTintColor: Colors.grey,
      })}
    >
      <Tabs.Screen
        name="(homeTab)"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="favoriteTab"
        options={() => ({
          tabBarLabel: "Favorites",
        })}
      />
      <Tabs.Screen
        name="(cartTab)"
        options={{
          tabBarLabel: "Cart",
          tabBarBadge: cart.items.length === 0 ? undefined : cart.items.length,
        }}
      />
    </Tabs>
  );
}
