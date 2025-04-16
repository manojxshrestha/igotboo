import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { supabase } from '@/lib/supabase';
import { MemeCard } from '@/components/MemeCard';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 50;

export default function Feed() {
  const [memes, setMemes] = useState([]);
  const translateY = useSharedValue(0);

  useEffect(() => {
    loadMemes();
  }, []);

  async function loadMemes() {
    const { data, error } = await supabase
      .from('memes')
      .select(`
        *,
        users (username),
        reactions (emoji)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setMemes(data);
    }
  }

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      // Handle like
      console.log('Liked!');
    } else {
      // Handle pass
      console.log('Passed!');
    }
    translateY.value = withSpring(0);
  };

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationY) > SWIPE_THRESHOLD) {
        const direction = event.translationY > 0 ? 'down' : 'up';
        runOnJS(handleSwipe)(direction);
      } else {
        translateY.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      {memes.map((meme, index) => (
        <GestureDetector key={meme.id} gesture={gesture}>
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ translateY }],
                zIndex: memes.length - index,
              },
            ]}>
            <MemeCard meme={meme} />
          </Animated.View>
        </GestureDetector>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '90%',
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    overflow: 'hidden',
  },
});