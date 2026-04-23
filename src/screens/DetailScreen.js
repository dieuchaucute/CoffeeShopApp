import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import imageMap from '../data/imageMap';

const { width } = Dimensions.get('window');

const SIZES = ['S', 'M', 'L'];

export default function DetailScreen({ route, navigation }) {
  const { coffee } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const imageSource = imageMap[coffee.image] ?? imageMap['coffee_mocha'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F2EC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Top Header ── */}
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Detail</Text>

            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => setLiked(!liked)}
              activeOpacity={0.8}
            >
              <Text style={[styles.heartIcon, liked && styles.heartActive]}>
                {liked ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* ── Hero Image ── */}
        <View style={styles.heroWrap}>
          <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />
        </View>

        {/* ── Info Card ── */}
        <View style={styles.infoCard}>
          {/* Name + icons */}
          <View style={styles.nameRow}>
            <View style={styles.nameBlock}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <Text style={styles.coffeeType}>Ice / Hot</Text>
            </View>
            <View style={styles.badgeRow}>
              {['🧊', '☕', '🥛'].map((icon, i) => (
                <View key={i} style={styles.badge}>
                  <Text style={styles.badgeIcon}>{icon}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rating + divider */}
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingVal}>{coffee.rating}</Text>
            <Text style={styles.ratingCount}>({coffee.reviews})</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.descText} numberOfLines={expanded ? undefined : 3}>
            {coffee.description}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
            <Text style={styles.readMore}>
              {expanded ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>

          {/* Size */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Size</Text>
          <View style={styles.sizeRow}>
            {SIZES.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.sizeBtn, selectedSize === s && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(s)}
                activeOpacity={0.8}
              >
                <Text style={[styles.sizeText, selectedSize === s && styles.sizeTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom spacer for fixed bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Fixed Bottom Bar ── */}
      <View style={styles.bottomBar}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {coffee.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.buyBtn}
          
          activeOpacity={0.85}
        >
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2EC',
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  backIcon: {
    fontSize: 30,
    color: colors.textDark,
    lineHeight: 34,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  heartBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 26,
    color: colors.textGray,
  },
  heartActive: {
    color: '#E74C3C',
  },

  // Hero
  heroWrap: {
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
    height: 226,
    backgroundColor: '#D0C8C0',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },

  // Info
  infoCard: {
    paddingHorizontal: 24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nameBlock: {
    flex: 1,
    marginRight: 12,
  },
  coffeeName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 4,
  },
  coffeeType: {
    fontSize: 13,
    color: colors.textGray,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0E6DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 17,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  star: {
    color: colors.starColor,
    fontSize: 20,
    marginRight: 5,
  },
  ratingVal: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textDark,
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 13,
    color: colors.textGray,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E0D8',
    marginBottom: 18,
  },

  // Description
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
  },
  descText: {
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 22,
  },
  readMore: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
    marginTop: 4,
  },

  // Size
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0D8D0',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  sizeBtnActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5EE',
  },
  sizeText: {
    fontSize: 15,
    color: colors.textGray,
    fontWeight: '500',
  },
  sizeTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  priceBlock: {
    gap: 4,
  },
  priceLabel: {
    fontSize: 13,
    color: colors.textGray,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  buyBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 52,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  buyBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
