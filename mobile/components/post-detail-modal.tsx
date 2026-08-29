import { useEffect, useMemo } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { PostDetailContent } from "./post-detail-content";
import type { Post } from "@/lib/data";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DISMISS_THRESHOLD = 150;
const DISMISS_VELOCITY = 800;
const SPRING_CONFIG = { damping: 22, stiffness: 180, mass: 0.8 };

type PostDetailModalProps = {
  post: Post | null;
  visible: boolean;
  onClose: () => void;
  onOpenShare: (postId: string) => void;
  onOpenMore: (postId: string, authorId: string) => void;
  reactionState: {
    reaction?: string;
    setReaction: (r: string | null) => void;
    saved: boolean;
    onToggleSave: () => void;
    onShare: () => void;
  };
  getComments: (postId: string) => any[];
  addComment: (postId: string, text: string, parentId?: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  updateComment: (postId: string, commentId: string, text: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  reportPost: (postId: string, category: string) => void;
};

export function PostDetailModal({
  post,
  visible,
  onClose,
  onOpenShare,
  onOpenMore,
  reactionState,
  getComments,
  addComment,
  toggleCommentLike,
  updateComment,
  deleteComment,
  reportPost,
}: PostDetailModalProps) {
  if (!post || !visible) return null;

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.95);
  const isDismissing = useSharedValue(false);

  useEffect(() => {
    translateY.value = withSpring(0, SPRING_CONFIG);
    backdropOpacity.value = withTiming(0.5, { duration: 200 });
    contentScale.value = withSpring(1, SPRING_CONFIG);
    isDismissing.value = false;
  }, [post?.id]);

  const panGesture = useMemo(() => {
    const gesture = Gesture.Pan()
      .onStart((_, ctx: any) => {
        ctx.startY = translateY.value;
        isDismissing.value = false;
      })
      .onUpdate((event, ctx: any) => {
        const translation = Math.max(0, (ctx.startY ?? 0) + event.translationY);
        translateY.value = translation;
        const progress = Math.min(1, translation / SCREEN_HEIGHT);
        backdropOpacity.value = 0.5 * (1 - progress);
        contentScale.value = 0.95 + 0.05 * progress;
      })
      .onEnd((event) => {
        const velocity = event.velocityY;
        const shouldDismiss = translateY.value > DISMISS_THRESHOLD || velocity > DISMISS_VELOCITY;

        if (shouldDismiss) {
          isDismissing.value = true;
          translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, (finished) => {
            if (finished) {
              runOnJS(onClose)();
            }
          });
          backdropOpacity.value = withTiming(0, { duration: 150 });
          contentScale.value = withSpring(0.95, SPRING_CONFIG);
        } else {
          translateY.value = withSpring(0, SPRING_CONFIG);
          backdropOpacity.value = withTiming(0.5, { duration: 200 });
          contentScale.value = withSpring(1, SPRING_CONFIG);
        }
      });
    return gesture;
  }, []);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: contentScale.value },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleBackdropPress = () => {
    if (!isDismissing.value) {
      isDismissing.value = true;
      translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, (finished) => {
        if (finished) runOnJS(onClose)();
      });
      backdropOpacity.value = withTiming(0, { duration: 150 });
      contentScale.value = withSpring(0.95, SPRING_CONFIG);
    }
  };

  const handleContentPress = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container} pointerEvents={visible ? "auto" : "none"}>
      <Animated.View
        style={[styles.backdrop, backdropStyle]}
        onTouchStart={handleBackdropPress}
        accessible={false}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.modalContainer, modalStyle]}
          onTouchStart={handleContentPress}
        >
          <View style={styles.dragHandle} />
          <PostDetailContent
            post={post}
            onOpenShare={onOpenShare}
            onOpenMore={onOpenMore}
            reactionState={reactionState}
            getComments={getComments}
            addComment={addComment}
            toggleCommentLike={toggleCommentLike}
            updateComment={updateComment}
            deleteComment={deleteComment}
            reportPost={reportPost}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 200,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT,
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.2,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: -12 },
    elevation: 28,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
});