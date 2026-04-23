import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
  
} from 'react-native';
import { colors } from '../theme/colors';
import data from '../data/data.json';
import imageMap from '../data/imageMap';
import { ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 12) / 2;

// ─── Coffee Card ────────────────────────────────────────────────────────────
function CoffeeCard({ item, onPress }) {
  const imageSource = imageMap[item.image];
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.88}
    >
      <View style={styles.cardImageWrap}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSub} numberOfLines={1}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => onPress(item)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All Coffee');
  const [searchText, setSearchText] = useState('');

  const { categories, coffeeList } = data;

  const filtered = useMemo(() => {
    return coffeeList.filter((item) => {
      const matchCat =
        selectedCategory === 'All Coffee' || item.category === selectedCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchText, coffeeList]);

  const handleCardPress = (coffee) => {
    navigation.navigate('Detail', { coffee });
  };

  const renderCard = ({ item, index }) => (
    <View style={index % 2 === 0 ? styles.colLeft : styles.colRight}>
      <CoffeeCard item={item} onPress={handleCardPress} />
    </View>
  );

  const ListHeader = () => (
    <>
    <View style={styles.bgtop}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Location</Text>
          <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
            <Text style={styles.locationText}>Bilzen, Tanjungbalai</Text>
            <Text style={styles.locationArrow}> ▾</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
          <View style={styles.filterLines}>
            <View style={[styles.filterLine, { width: 16 }]} />
            <View style={[styles.filterLine, { width: 10 }]} />
          </View>
          <View style={styles.filterDot} />
        </TouchableOpacity>
      </View>

      {/* ── Search ── */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search coffee"
          placeholderTextColor={colors.textGray}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Promo Banner ── */}
      <ImageBackground
       source={require("../../assets/banner.jpg")}
      resizeMode="cover"
      style={styles.promoBanner}
       >
         
        <View style={styles.promoLeft}>
         
          <View style={styles.promoTag}>
            <Text style={styles.promoTagText}>Promo</Text>
          </View>
          <Text style={styles.promoTitle}>Buy one get{'\n'}one FREE</Text>
        </View>
        </ImageBackground>
     </View>   
      {/* ── Categories ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
        style={styles.catScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catTab, selectedCategory === cat && styles.catTabActive]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.catText,
                selectedCategory === cat && styles.catTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Section title ── */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All Coffee' ? 'All Coffee' : selectedCategory}
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} translucent />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderCard}
        ListHeaderComponent={ListHeader}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No coffee found ☕</Text>
          </View>
        }
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 20,
   
  },
  locationLabel: {
    fontSize: 12,
    color: colors.textGray,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  locationArrow: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  filterLines: {
    gap: 3,
    alignItems: 'flex-end',
  },
  filterLine: {
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  filterDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    padding: 0,
  },
  clearIcon: {
    color: colors.textGray,
    fontSize: 14,
    paddingLeft: 8,
  },

  // Promo
  promoBanner: {
    marginHorizontal: 24,
    backgroundColor: '#2C1A0E',
    borderRadius: 20,
    paddingLeft: 20,
    paddingVertical: 20,
    marginBottom: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 140,
    position: "absolute",
    marginTop:200,
  },
  promoLeft: {
    flex: 1,
  },
  promoTag: {
    backgroundColor: colors.promoRed,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  promoTagText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  promoTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 34,
  },
  promoImageWrap: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    marginRight: -20,
    backgroundColor: 'rgba(198,124,78,0.25)',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },

  // Categories
  catScroll: {
    paddingTop:120,
    marginBottom: 20,
  },
  catList: {
    paddingHorizontal: 24,
    gap: 8,
  },
  catTab: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
  },
  catTabActive: {
    backgroundColor: colors.primary,
  },
  catText: {
    color: colors.textGray,
    fontSize: 14,
    fontWeight: '500',
  },
  catTextActive: {
    color: colors.white,
    fontWeight: '700',
  },

  // Section
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },

  // Grid
  row: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 12,
  },
  colLeft: {
    flex: 1,
  },
  colRight: {
    flex: 1,
  },

  // Card
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImageWrap: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 132,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  ratingStar: {
    color: colors.starColor,
    fontSize: 10,
    marginRight: 2,
  },
  ratingText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  cardBody: {
    padding: 12,
  },
  cardName: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSub: {
    color: colors.textGray,
    fontSize: 12,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '300',
  },

  // Empty
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: colors.textGray,
    fontSize: 15,
  },
  bgtop:{
    backgroundColor:"black",
    height:300,
  }
});
