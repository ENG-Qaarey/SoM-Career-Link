import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CURRENT_USER, type PostComment } from "@/lib/data";

type CommentListProps = {
  postId: string;
  comments: PostComment[];
  onAddComment: (postId: string, text: string, parentId?: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
  onUpdateComment: (postId: string, commentId: string, text: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  onReport: (postId: string, category: string) => void;
};

export function CommentList({
  postId,
  comments,
  onAddComment,
  onLikeComment,
  onUpdateComment,
  onDeleteComment,
  onReport,
}: CommentListProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [showReport, setShowReport] = useState<{ id: string; parentId?: string } | null>(null);
  const [reportCategory, setReportCategory] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);

  const REPORT_CATEGORIES = [
    { id: "spam", label: "Spam" },
    { id: "harassment", label: "Harassment" },
    { id: "fake", label: "Fake opportunity" },
    { id: "scam", label: "Scam" },
    { id: "inappropriate", label: "Inappropriate content" },
    { id: "other", label: "Other" },
  ];

  const submitReport = () => {
    if (showReport && reportCategory) {
      onReport(postId, reportCategory);
      setShowReport(null);
      setReportCategory("");
      Alert.alert("Thank you", "Your report has been submitted. We'll review it shortly.");
    }
  };

  const confirmDelete = (commentId: string) => {
    Alert.alert("Delete comment", "This will permanently delete your comment.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          onDeleteComment(postId, commentId);
          setOpenMenu(null);
        },
      },
    ]);
  };

  if (comments.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="chatbubbles-outline" size={38} color="#cbd5e1" />
        <Text style={styles.emptyTitle}>No comments yet</Text>
        <Text style={styles.emptyText}>Be the first to share your thoughts.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          depth={0}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          editingId={editingId}
          setEditingId={setEditingId}
          editingText={editingText}
          setEditingText={setEditingText}
          onSubmitEdit={(id) => onUpdateComment(postId, id, editingText)}
          onConfirmDelete={confirmDelete}
          onReply={() => setReplyingTo({ id: comment.id, name: comment.authorName })}
          onReport={() => setShowReport({ id: comment.id })}
          onLike={onLikeComment}
        />
      ))}
    </View>
  );
}

type CommentItemProps = {
  comment: PostComment;
  postId: string;
  depth: number;
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  editingText: string;
  setEditingText: (t: string) => void;
  onSubmitEdit: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onReply: () => void;
  onReport: () => void;
  onLike: (postId: string, commentId: string) => void;
};

function CommentItem(props: CommentItemProps) {
  const {
    comment,
    depth,
    openMenu,
    setOpenMenu,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    onSubmitEdit,
    onConfirmDelete,
    onReply,
    onReport,
    onLike,
  } = props;
  const isMine = comment.authorId === CURRENT_USER.id;
  const isEditing = editingId === comment.id;

  return (
    <View style={[styles.comment, depth > 0 && styles.commentNested]}>
      <View style={styles.commentAvatar}>
        <View style={[styles.avatar, { backgroundColor: comment.authorColor }]}>
          <Text style={styles.avatarText}>{comment.authorInitials}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.commentBubble}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentAuthor} numberOfLines={1}>
              {comment.authorName}
            </Text>
          </View>
          {isEditing ? (
            <View>
              <TextInput
                style={styles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                multiline
                maxLength={500}
                autoFocus
              />
              <View style={styles.editActions}>
                <Pressable onPress={() => { setEditingId(null); setEditingText(""); }}>
                  <Text style={styles.editCancel}>Cancel</Text>
                </Pressable>
                <Pressable onPress={() => onSubmitEdit(comment.id)} style={styles.editSave}>
                  <Text style={styles.editSaveText}>Save</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Text style={styles.commentText}>{comment.content}</Text>
          )}
        </View>
        <View style={styles.commentMetaRow}>
          <Text style={styles.commentMeta}>{comment.timeLabel}</Text>
          {comment.edited && <Text style={styles.commentMeta}> · Edited</Text>}
          {comment.likes > 0 && (
            <Text style={styles.commentMeta}> · {comment.likes}</Text>
          )}
          <Pressable onPress={() => onLike(postId, comment.id)} hitSlop={4}>
            <Text style={[styles.commentAction, comment.liked && styles.commentActionOn]}>
              Like
            </Text>
          </Pressable>
          {depth === 0 && (
            <Pressable onPress={onReply} hitSlop={4}>
              <Text style={styles.commentAction}>Reply</Text>
            </Pressable>
          )}
          <Pressable onPress={() => setOpenMenu(openMenu === comment.id ? null : comment.id)} hitSlop={4}>
            <Ionicons name="ellipsis-horizontal" size={16} color="#94a3b8" />
          </Pressable>
        </View>
        {openMenu === comment.id && (
          <View style={styles.commentMenu}>
            {isMine ? (
              <>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    setEditingId(comment.id);
                    setEditingText(comment.content);
                    setOpenMenu(null);
                  }}
                >
                  <Feather name="edit-2" size={16} color="#0f172a" />
                  <Text style={styles.menuItemText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={[styles.menuItem, styles.menuItemDanger]}
                  onPress={() => onConfirmDelete(comment.id)}
                >
                  <Feather name="trash-2" size={16} color="#ef4444" />
                  <Text style={styles.menuItemTextDanger}>Delete</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.menuItem} onPress={() => { setOpenMenu(null); onReport(); }}>
                  <Feather name="flag" size={16} color="#0f172a" />
                  <Text style={styles.menuItemText}>Report</Text>
                </Pressable>
              </>
            )}
          </View>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <View style={styles.repliesWrap}>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={props.postId}
                depth={depth + 1}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                editingId={editingId}
                setEditingId={setEditingId}
                editingText={editingText}
                setEditingText={setEditingText}
                onSubmitEdit={onSubmitEdit}
                onConfirmDelete={onConfirmDelete}
                onReply={onReply}
                onReport={onReport}
                onLike={onLike}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingTop: 4,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 8,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 260,
  },
  comment: {
    flexDirection: "row",
    gap: 10,
  },
  commentNested: {
    marginTop: 12,
    marginLeft: 6,
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: "#e2e8f0",
  },
  commentAvatar: {
    paddingTop: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  commentBubble: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
  },
  commentHeader: {
    marginBottom: 2,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1e293b",
  },
  commentMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
    paddingLeft: 4,
  },
  commentMeta: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
  },
  commentAction: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748b",
  },
  commentActionOn: {
    color: "#2563eb",
  },
  commentMenu: {
    marginTop: 8,
    marginLeft: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 4,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  menuItemDanger: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
  },
  menuItemTextDanger: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ef4444",
  },
  repliesWrap: {
    marginTop: 4,
  },
  editInput: {
    fontSize: 14,
    lineHeight: 20,
    color: "#0f172a",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    minHeight: 40,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 6,
  },
  editCancel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  editSave: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editSaveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
});