import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground
        source={require('../../assets/coffee_onboarding.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient overlay — top transparent, bottom dark */}
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Spacer to push content down */}
            <View style={styles.spacer} />

            {/* Text block */}
            <View style={styles.textBlock}>
              <Text style={styles.title}>
                Fall in Love with{'\n'}Coffee in Blissful{'\n'}Delight!
              </Text>
              <Text style={styles.subtitle}>
                Welcome to our cozy coffee corner, where{'\n'}
                every cup is a delightful for you.
              </Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace('MainTabs')}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    height: height * 0.5,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
    backgroundColor: 'rgba(0,0,0,0.72)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  spacer: {
    flex: 1,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
