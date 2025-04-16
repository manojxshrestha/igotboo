import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Heart, MessageCircle, Flame } from 'lucide-react-native';

export function MemeCard({ meme }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: meme.image_url }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.username}>@{meme.users.username}</Text>
        <Text style={styles.caption}>{meme.caption}</Text>
        <View style={styles.reactions}>
          <View style={styles.reaction}>
            <Heart size={24} color="#DB2777" />
            <Text style={styles.reactionCount}>
              {meme.reactions.filter((r) => r.emoji === '❤️').length}
            </Text>
          </View>
          <View style={styles.reaction}>
            <MessageCircle size={24} color="#3B82F6" />
            <Text style={styles.reactionCount}>
              {meme.reactions.filter((r) => r.emoji === '😂').length}
            </Text>
          </View>
          <View style={styles.reaction}>
            <Flame size={24} color="#EF4444" />
            <Text style={styles.reactionCount}>
              {meme.reactions.filter((r) => r.emoji === '🔥').length}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  caption: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  reactions: {
    flexDirection: 'row',
    gap: 16,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reactionCount: {
    color: '#fff',
    fontSize: 16,
  },
});