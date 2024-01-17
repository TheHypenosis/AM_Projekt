import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ScrollView   } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { productImage } from '../imageHandler/productImageHandler'

import { getBestsellerShowcase } from '../db/queries/showcaseObject.query';
import { getNewsFeedShowcase } from '../db/queries/showcaseObject.query';
import { useFontsLoaded} from './FontContext';

const Home = () => {
  const [newsShowcase, setNewsShowcase] = useState([]);
  const [newsCarouselData, setNewsCarouselData] = useState([]);
  const [bestsellerShowcase, setBestsellerShowcase] = useState([]);
  const [bestsellerCarouselData, setBestsellerCarouselData] = useState([]);
  const fontsLoaded = useFontsLoaded();
  const carouselRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch News Feed Showcase
        const newsShowcaseData = await getNewsFeedShowcase();
        setNewsShowcase(newsShowcaseData);
        const bestsellerShowcaseData = await getBestsellerShowcase();
        setBestsellerShowcase(bestsellerShowcaseData);

        // Map data to newsCarouselData format
        const newsMappedData = newsShowcaseData.map((item, index) => {
          // Use the dynamic key to access the image
          const productImageKey = `${item.Image}`;
          const productImageObj = productImage[productImageKey];

          return {
            key: index.toString(),
            prodID: item.ID,
            image: productImageObj,
            title: item.Name,
            price: `$${item.Price.toFixed(2)}`,
            description: item.Description,
          };
        });

        const bestsellerMappedData = bestsellerShowcaseData.map((item, index) => {
          // Use the dynamic key to access the image
          const productImageKey = `${item.Image}`;
          const productImageObj = productImage[productImageKey];

          return {
            key: index.toString(),
            prodID: item.ID,
            image: productImageObj,
            title: item.Name,
            price: `$${item.Price.toFixed(2)}`,
            description: item.Description,
          };
        });

        setNewsCarouselData(newsMappedData);
        setBestsellerCarouselData(bestsellerMappedData);
      } catch (error) {
        console.error('Error fetching and mapping data:', error);
      }
    };

    fetchData();
  }, []);

  const renderNewsCarouselItem = ({ item }) => {  
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HomeProductScreen', {item})}>
      <View style={styles.newsCarouselItem}>
        {/* Carousel Image */}
        <Image source={item.image} style={styles.newsCarouselImage} />
        {/* Wishlist button */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require('../../assets/img/Home/Wishlist.png')} />
        </TouchableOpacity>
        {/* Title and description */}
        <View style={[styles.textContainer, { backgroundColor: item.backgroundColor }]}>
          <Text style={styles.newsCarouselTitle}>{item.title}</Text>
          <Text style={styles.newsCarouselDescription}>{item.price}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  const renderBestsellerItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('HomeProductScreen', { item })}>    
    <View style={styles.bestsellerCarouselItem}>
      {/* Carousel Image */}
      <Image source={item.image} style={styles.bestsellerCarouselImage} />
      {/* Wishlist button */}
      <TouchableOpacity style={styles.buttonContainer}>
        <Image source={require('../../assets/img/Home/Wishlist.png')} />
      </TouchableOpacity>
      {/* Title and description */}
      <View style={[styles.textContainer, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.bestsellerCarouselTitle}>{item.title}</Text>
        <Text style={styles.bestsellerCarouselDescription}>{item.price}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )

  // Right Arrow in the News Carousel action
  const snapToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  };
  // Left Arrow in the News Carousel action
  const snapToPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev();
    }
  };
  //Validation if the fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  function viewBestsellers() {
    return console.log("View All Button pressed - Bestsellers!");
  }

  function viewFavourites() {
    return console.log("View All Button pressed - Favourites!");
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView>
        <View style={styles.header}>
            {/* Logo Image */}
            <Image
            source={require('../../assets/img/Home/Logo.png')} 
            style={styles.logo}
            />
            <View style={{ flex: 1 }} />
            {/* Cart button */}
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
                source={require('../../assets/img/Home/Cart.png')} 
            />
            </TouchableOpacity>
        </View>
        {/* Content - Main photo */}
        <Image
        source={require('../../assets/img/Home/mainPhoto.png')} 
        style={styles.resizedPhoto}
        />

        {/* News Carousel */}   

        {/* News title and navigation arrows */}
        <View style={styles.newsContainer}>
            <Text style={styles.newsTitle}>News</Text>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={snapToPrev}>
                <Image
                    source={require('../../assets/img/Home/chevron-left.png')} 
                    style={styles.arrowIcon}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={snapToNext}>
                <Image
                    source={require('../../assets/img/Home/chevron-right.png')} 
                    style={styles.arrowIcon}
                />
                </TouchableOpacity>
            </View>
        </View>
        <Carousel
            ref={carouselRef}
            data={newsCarouselData}
            renderItem={renderNewsCarouselItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 160}
            itemHeight={(windowWidth - 160) * 1.5}
            layout="default"
            loop
            inactiveSlideScale={0.9} // Scale factor for inactive slides
            inactiveSlideOpacity={0.7} // Opacity for inactive slides
            firstItem={0} 
            activeSlideAlignment="start"
            contentContainerCustomStyle={{ paddingLeft: 20, paddingRight: 40, overflow: 'visible' }} 
        />
        <View style={styles.bestsellersContainer}>
            <Text style={styles.bestsellersTitle}>Bestsellers</Text>
            <TouchableOpacity onPress={viewBestsellers}>
                <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
        </View>
        <Carousel
            data={bestsellerCarouselData}
            renderItem={renderBestsellerItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 200}
            itemHeight={(windowWidth - 200) * 0.7}
            layout="default"
            loop
            inactiveSlideScale={1} // Scale factor for inactive slides
            inactiveSlideOpacity={1} // Opacity for inactive slides
            firstItem={0} 
            activeSlideAlignment="start"
            contentContainerCustomStyle={{ paddingLeft: 20, paddingRight: 40, overflow: 'visible' }} 
        />
        <View style={styles.favouritesContainer}>
            <View style={styles.favouritesTopContainer}>
                <Text style={styles.favouritesTitle}>Your favourites</Text>
                <TouchableOpacity onPress={viewFavourites}>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.mediaContainer}>
            <View style={styles.mediaTitleContainer}>
                <Image
                    source={require('../../assets/img/Home/Instagram.png')} 
                    style={styles.instagramIcon}
                />
                <Text style={styles.mediaTitle}>matchymatchy_pl</Text>
            </View>
            <Image
                source={require('../../assets/img/Home/InstagramImages.png')} 
                style={styles.instagramIcon}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  logo: {
    marginRight: 16,
  },
  resizedPhoto: {
    width: '100%', // Take up the entire width of the screen
    marginBottom: 15,
    resizeMode: 'cover', // Ensure the image covers the entire space without stretching
  },
  slide: {
    backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25,
  },
  cardTitle: {
    fontSize: 30,
  },
  newsCarouselItem: {
    flex: 1,   
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:20,
    marginBottom:60,
  },
  newsCarouselImage: {
    width: '100%',
    height: 300,
    //resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    bottom: -50, // Adjusted to be above the image
    left: 0,
    right: 0,
    padding: 8,
    paddingTop:10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  newsCarouselTitle: {
    fontFamily: 'LoraBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#1F2223',
  },
  newsCarouselDescription: {
    fontFamily: 'LoraRegular',
    fontSize: 16,
    color: '#363939',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 3,
  },
  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  newsTitle: {
    fontFamily: 'LoraBold',
    fontSize: 24,
    color: '#363939',
  },
  arrowContainer: {
    flexDirection: 'row',
  },
  arrowIcon: {
    marginLeft: 10, // Adjust the spacing between the title and arrows
  },
  bestsellersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bestsellersTitle: {
    fontFamily: 'LoraBold',
    fontSize: 18,
    color: '#363939',
  },
  viewAllText: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: '#797A7B',
  },

  bestsellerCarouselImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
    zIndex: 2,
  },
  bestsellerCarouselItem: {
    flex: 1,   
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:20,
    marginBottom:60,
  },
  bestsellerCarouselTitle: {
    fontFamily: 'LoraRegular',
    fontSize: 16,
    marginBottom: 8,
    color: '#1F2223',
  },
  bestsellerCarouselDescription: {
    fontFamily: 'LoraRegular',
    fontSize: 16,
    color: '#363939',
  },
  favouritesContainer: {
    backgroundColor: '#ECD7BA',
  },
  favouritesTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  favouritesTitle: {
    fontFamily: 'LoraBold',
    fontSize: 24,
    color: '#363939'
  },
  mediaContainer: {
    flex: 1,   
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30,
  },
  mediaTitleContainer: {
    flexDirection: 'row',
    marginTop:15,
    marginBottom:5,
  },
  mediaTitle: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    color: '#000000',
    marginLeft:9,
    marginTop:3,
  },
  
});

export default Home;
