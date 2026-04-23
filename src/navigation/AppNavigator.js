import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Placeholder screens for unused tabs ─────────────────────────────────────
function FavoriteScreen() {
  return (
    <View style={placeholder.container}>
      <Text style={placeholder.text}>Favorites</Text>
    </View>
  );
}
function CartScreen() {
  return (
    <View style={placeholder.container}>
      <Text style={placeholder.text}>Cart</Text>
    </View>
  );
}
function NotificationScreen() {
  return (
    <View style={placeholder.container}>
      <Text style={placeholder.text}>Notifications</Text>
    </View>
  );
}
const placeholder = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F2EC' },
  text: { fontSize: 18, color: '#9B9B9B' },
});

// ─── Tab Icon ─────────────────────────────────────────────────────────────────
function TabIcon({ icon, focused }) {
  return (
    <View style={[tabStyles.iconWrap, focused && tabStyles.iconWrapActive]}>
      <Text style={[tabStyles.icon, focused && tabStyles.iconActive]}>{icon}</Text>
      {focused && <View style={tabStyles.dot} />}
    </View>
  );
}

// ─── Bottom Tabs ─────────────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="⌂" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="♡" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🛍" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="NotifTab"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔔" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#FFF0E6',
  },
  icon: {
    fontSize: 22,
    color: '#BDBDBD',
  },
  iconActive: {
    color: colors.primary,
  },
  dot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

// ─── Root Stack Navigator ─────────────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Onboarding — shown once */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ animation: 'fade' }}
        />

        {/* Main app with Bottom Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ animation: 'fade' }}
        />

        {/* Detail pushed on top of tabs */}
        <Stack.Screen name="Detail" component={DetailScreen} />

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
