import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { getSearchResult } from "../db/queries/search.query";
import { getCategories } from '../db/queries/categories.query';
import { productImage } from '../imageHandler/productImageHandler'

const SearchFilter = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleSearch = async () => {
    try {
      if (searchInput.trim() !== '') {
        const results = await getSearchResult(searchInput);
        setSearchResults(results);

        const resultsMappedData = results.map((item, index) => {
          // Use the dynamic key to access the image
          const productImageKey = `${item.Image}`;
          const productImageObj = productImage[productImageKey];

          return {
            key: index.toString(),
            image: productImageObj,
            title: item.Name,
            description: `$${item.Price.toFixed(2)}`,
          };
        });

        setSearchResults(resultsMappedData);
      }

    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleClearInput = () => {
    setSearchInput('');
    setSearchResults([]); // Clear search results
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResults = await getCategories();
        setCategories(categoriesResults);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories on component mount

  useEffect(() => {
    // Trigger the search directly when searchInput changes
    handleSearch();
  }, [searchInput]); // Watch for changes in searchInput

  const handleCategoryPress = (categoryName) => {
    // Trim the category name before setting it in the TextInput
    const trimmedName = trimCategoryName(categoryName, keepWords);
    setSearchInput(trimmedName);
  };

  const keepWords = ['trousers', 'shorts'];

  const trimCategoryName = (categoryName, keepWords) => {
    const lowerCaseName = categoryName.toLowerCase();
    if (keepWords.includes(lowerCaseName)) {
      return categoryName;
    }
    if (lowerCaseName.endsWith('s')) {
      return categoryName.slice(0, -1);
    }
    return categoryName;
  };

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(category.Name)}
    >
      <Text style={styles.categoryText}>{category.Name}</Text>
      {/* Add other components for the icon */}
      <Image source={require(`../../assets/img/Search/chevron-right.png`)} style={styles.categoryIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchBarContainer}>
          {/* Left icon/image */}
          <Image
            source={require('../../assets/img/Search/search.png')}
            style={styles.leftIcon}
          />

          

          {/* Search input */}
          <TextInput
            placeholder="Search by keywords or categories"
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
            style={styles.textInput}
            onEndEditing={() => {
              if (searchInput.trim() === '') {
                setSearchResults([]); // Clear search results
              }
            }}
          />

          {/* Clear button */}
          {searchInput !== '' && (
            <TouchableOpacity onPress={handleClearInput}>
              <Image source={require('../../assets/img/Search/x-circle.png')} style={styles.clearIcon} />
            </TouchableOpacity>
          )}

          {/* Right Done button */}
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>
        
        {searchInput === '' && (
          <View style={styles.categorySuggestions}>
            {categories.map((category) => renderCategory(category))}
          </View>
        )}

        {/* Filter info and button */}
        {searchResults.length > 0 && (

          <View style={styles.filtersContainer}>
            {/* "Results found" section */}
            <View >
              <Text style={styles.resultsCount}>{`${searchResults.length} Results for "${searchInput}"`}</Text>
            </View>

            {/* "Filters" button */}
              <TouchableOpacity onPress={toggleFilterModal}>
              <View style={styles.filtersButtonContainer}>
                <Image source={require('../../assets/img/Search/sliders.png')} style={styles.filterIcon} />
                <Text style={styles.filterText}>Filters</Text>
                </View>
              </TouchableOpacity>
            
          </View>
      )}


        {/* Display search results */}
        {searchResults.map((item) => (
          <View key={item.key} style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>
            {/* Wishlist button */}
            <TouchableOpacity style={styles.buttonContainer}>
              <Image source={require('../../assets/img/Home/Wishlist.png')} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 0,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftIcon: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    marginRight: 10, // Adjust the margin as needed
  },
  textInput: {
    flex: 1,
    height: 40, // Adjust the height as needed
    fontSize: 16,
    fontFamily: 'InterRegular',
    paddingLeft: 10,
  },
  doneButton: {
    marginLeft: 10, 
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    color: '#363939',
  },
  categorySuggestions: {
    marginTop: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  categoryText: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    marginLeft: 15,
    margin: 5,
  },
  categoryIcon: {
    marginRight: 10,
  },
  clearIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D2D3D3',
  },
  productImage: {
    width: '40%',
    height: 200,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  productTitle: {
    fontFamily: 'LoraBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#1F2223',
  },
  productDescription: {
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    borderTopWidth: 1,  // Add a border at the top
    borderBottomWidth: 1,
    borderColor: '#D2D3D3',  // Adjust the color as needed
  },
  filtersButtonContainer:{
    flexDirection: 'row',  
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#363939',
    padding:7,
    margin:10,
  },
  resultsCount: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  filterText: {
    marginLeft: 6,
  }
});


export default SearchFilter;
