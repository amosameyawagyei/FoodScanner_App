import { CameraView, CameraType } from 'expo-camera';
import axios from 'axios'
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { gql, useLazyQuery } from '@apollo/client';
import FoodListItem from '../components/FoodListItem';
import { Ionicons } from '@expo/vector-icons';

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      text
      hints {
        food {
          label
          brand
          foodId
          nutrients {
          
            ENERC_KCAL
            

          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
 const  [googleVisionEnabled, setGoogleVisionEnabled] = useState(false);


 const  detectObject = () =>{
  const [labels, setLabels] = useState([])
 }
 const apiKey = 'AIzaSyC68PYPh_Q_rnaHi7b-z6rBvwmjNmagr08'

  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
   
  };


  const handleBarcodeScanned = (barcodeData: { data: string }) => {
    runSearch({ variables: { upc: barcodeData.data } });
    setScannerEnabled(false);
  };

  const items = data?.search?.hints || [];

  if (scannerEnabled) {
    return (
      <View style={styles.container}>
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          onBarcodeScanned={handleBarcodeScanned} 
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setScannerEnabled(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </CameraView>
      </View>
    );
  }
  if (googleVisionEnabled) {
    return(
      <View style ={styles.container}>
         <CameraView
          style={{ flex: 1 }}
          facing={facing}>
              <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setGoogleVisionEnabled(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          </CameraView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Ionicons 
        onPress={() => setGoogleVisionEnabled(true)}
        name="scan-outline" 
        size={24} 
        color="black" 
        />
        <Ionicons 
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={32}
          color="black"
        />
        
      </View>
      {search && <Button title="Search" onPress={performSearch} />}
      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 7 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2958E',
    padding: 10,
    gap: 10,
    
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 20,
  },

  
});


//import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// import { runOnJS } from 'react-native-reanimated';
// import axios from 'axios';

// import { Ionicons } from '@expo/vector-icons';

// export default function RealTimeSearchScreen() {
//   const [cameraPermission, setCameraPermission] = useState(false);
//   const [googleVisionResults, setGoogleVisionResults] = useState([]);
//   const [isCameraActive, setIsCameraActive] = useState(true);
//   const devices = useCameraDevices();
//   const device = devices.find((d) => d.position === 'back');

//   const apiKey = 'YOUR_GOOGLE_VISION_API_KEY';

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setCameraPermission(status === 'granted');
//     })();
//   }, []);

//   const frameProcessor = useFrameProcessor((frame) => {
//     'worklet';
//     // Replace `processedData` with actual data extracted from the frame
//     const processedData = {}; // Your logic to process the frame goes here
//     runOnJS(processFrame)(processedData);
//   }, []);
  
//   const processFrame = async (processedData: any) => {
//     try {
//       console.log('Processed Data:', processedData);
//       // Your API request or logic here
//     } catch (error) {
//       console.error('Error processing frame:', error);
//     }
  

//     try {
//       const response = await axios.post(
//         `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        
//       );

//       const detectedLabels = response.data.responses[0]?.labelAnnotations?.map(
//         (label: { description: string }) => label.description
//       );
//       setGoogleVisionResults(detectedLabels || []);
//     } catch (error) {
//       console.error('Error sending frame to Google Vision API:', error);
//     }
//   };

//   if (!cameraPermission) {
//     return <Text>Camera permission is required to use this feature.</Text>;
//   }

//   if (!device) {
//     return <Text>No back camera found</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {isCameraActive && (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           frameProcessor={frameProcessor}
//         />
//       )}
//       <TouchableOpacity
//         style={styles.closeButton}
//         onPress={() => setIsCameraActive(!isCameraActive)}
//       >
//         <Ionicons name="close" size={30} color="white" />
//       </TouchableOpacity>
//       <View style={styles.resultsContainer}>
//         <Text style={styles.resultsHeader}>Detected Labels:</Text>
//         {googleVisionResults.map((label, index) => (
//           <Text key={index} style={styles.resultItem}>
//             {label}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 5,
//     borderRadius: 20,
//     zIndex: 10,
//   },
//   resultsContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     right: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 10,
//     padding: 10,
//   },
//   resultsHeader: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   resultItem: {
//     color: 'white',
//     fontSize: 14,
//   },
// });

