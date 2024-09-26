import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "@/components/UI/CustomText";
import Colors from "@/utils/Colors";
import CustomDrawerContent from "@/components/navigation/CustomDrawerContent";
import { useProfile } from "@/context/ProfileContext";

export default function AppDrawerNavigator() {
  const profile = useProfile();
  const drawers = [
    {
      name: "(tabs)",
      label: "Home",
      icon: "home-outline",
    },
    {
      name: "order",
      label: "Order Tracking",
      icon: "receipt",
    },
    {
      name: "contact",
      label: "Contact",
      icon: "contacts",
    },
  ];
  const authDrawers = [
    {
      name: "touchId",
      label: "Touch/Face ID",
      icon: "security",
      getDisplay: (userId) => (userId ? undefined : "none"),
    },
    {
      name: "profile",
      label: "Profile",
      icon: "face-man-profile",
      getDisplay: (userId) => (userId ? undefined : "none"),
    },
    {
      name: "(auth)",
      label: "Sign In / Sign Up",
      icon: "login",
      getDisplay: (userId) => (userId ? "none" : undefined),
    },
  ];

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.grey,
        drawerItemStyle: { marginVertical: 3 },
      }}
    >
      {drawers.map((drawer) => (
        <Drawer.Screen
          key={drawer.name}
          name={drawer.name} // This is the name of the page and must match the url from root
          options={{
            drawerLabel: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: focused ? Colors.lighter_green : Colors.grey,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {drawer.label}
              </CustomText>
            ),
            title: drawer.label,
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={drawer.icon}
                size={23}
                color={focused ? Colors.lighter_green : Colors.grey}
              />
            ),
          }}
        />
      ))}

      {authDrawers.map((drawer) => (
        <Drawer.Screen
          key={drawer.name}
          name={drawer.name}
          options={{
            // https://github.com/expo/expo/issues/27851
            drawerItemStyle: {
              display: drawer.getDisplay(profile?.id),
            },
            drawerLabel: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: focused ? Colors.lighter_green : Colors.grey,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {drawer.label}
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={drawer.icon}
                size={25}
                color={focused ? Colors.lighter_green : Colors.grey}
              />
            ),
          }}
        />
      ))}
    </Drawer>
  );
}
