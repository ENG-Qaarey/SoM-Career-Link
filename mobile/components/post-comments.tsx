import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useApp } from "@/context/app-provider";
import { CURRENT_USER, type PostComment } from "@/lib/data";

type PostCommentsProps = {
  postId: string;
  visible: boolean;
  onClose: () => void;
};

const REPORT_CATEGORIES = [
  { id: "spam", label: "Spam" },
  { id: "harassment", label: "Harassment" },
  { id: "fake", label: "Fake opportunity" },
  { id: "scam", label: "Scam" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "other", label: "Other" },
];

export function PostComments({ postId, visible, onClose }: PostCommentsProps) {
  const {
    getComments,
    addComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    reportPost,
  } = useApp();

  const [text, setText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showReport, setShowReport] = useState<{ id: string; parentId?: string } | null>(null);
  const [reportCategory, setReportCategory] = useState("");

  const comments = getComments(postId);

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addComment(postId, trimmed, replyingTo?.id);
    setText("");
    setReplyingTo(null);
  };

  const submitEdit = (commentId: string) => {
    const trimmed = editingText.trim();
    if (!trimmed) return;
    updateComment(postId, commentId, trimmed);
    setEditingId(null);
    setEditingText("");
  };

  const confirmDelete = (commentId: string) => {
    Alert.alert("Delete comment", "This will permanently delete your comment.", [
      { text: "Cancel", style: "cancel", onPress: () => setOpenMenu(null) },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteComment(postId, commentId);
          setOpenMenu(null);
        },
      },
    ]);
  };

  const submitReport = () => {
    if (showReport && reportCategory) {
      reportPost(postId, reportCategory);
      setShowReport(null);
      setReportCategory("");
      Alert.alert("Thank you", "Your report has been submitted. We'll review it shortly.");
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Text style={styles.title}>
              Comments · {comments.length + comments.reduce((s, c) => s + (c.replies?.length ?? 0), 0)}
            </Text>
            <Pressable onPress={onClose} hitSlop={8} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#64748b" />
            </Pressable>
          </View>
        </View>

        {showReport ? (
          <View style={styles.reportWrap}>
            <Pressable
              style={styles.reportBack}
              onPress={() => {
                setShowReport(null);
                setReportCategory("");
              }}
            >
              <Feather name="arrow-left" size={16} color="#2563eb" />
              <Text style={styles.reportBackText}>Back to comments</Text>
            </Pressable>
            <Text style={styles.reportTitle}>Why are you reporting this?</Text>
            <View style={styles.reportCats}>
              {REPORT_CATEGORIES.map((c) => (
                <Pressable
                  key={c.id}
                  onPress={() => setReportCategory(c.id)}
                  style={[styles.reportCat, reportCategory === c.id && styles.reportCatOn]}
                >
                  <Text style={[styles.reportCatText, reportCategory === c.id && styles.reportCatTextOn]}>
                    {c.label}
                  </Text>
                  {reportCategory === c.id ? (
                    <Feather name="check" size={16} color="#2563eb" />
                  ) : null}
                </Pressable>
              ))}
            </View>
            <Pressable
              style={[styles.reportSubmit, !reportCategory && styles.reportSubmitDisabled]}
              disabled={!reportCategory}
              onPress={submitReport}
            >
              <Text style={styles.reportSubmitText}>Submit report</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {comments.length === 0 ? (
              <View style={styles.empty}>
                <Ionicons name="chatbubbles-outline" size={38} color="#cbd5e1" />
                <Text style={styles.emptyTitle}>Be the first to comment</Text>
                <Text style={styles.emptyText}>Share your thoughts with the community.</Text>
              </View>
            ) : (
              comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  postId={postId}
                  depth={0}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  editingId={editingId}
                  setEditingId={setEditingId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  submitEdit={submitEdit}
                  confirmDelete={confirmDelete}
                  onReply={() => setReplyingTo({ id: c.id, name: c.authorName })}
                  onReport={() => setShowReport({ id: c.id })}
                  toggleLike={() => toggleCommentLike(postId, c.id)}
                />
              ))
            )}
          </ScrollView>
        )}

        {!showReport ? (
          <View style={styles.composer}>
            <View style={styles.meAvatar}>
              <Text style={styles.meAvatarText}>{CURRENT_USER.initials}</Text>
            </View>
            <View style={styles.composerInputWrap}>
              {replyingTo ? (
                <View style={styles.replyingBar}>
                  <Text style={styles.replyingTo}>Replying to {replyingTo.name}</Text>
                  <Pressable onPress={() => setReplyingTo(null)} hitSlop={6}>
                    <Ionicons name="close-circle" size={16} color="#94a3b8" />
                  </Pressable>
                </View>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#94a3b8"
                value={text}
                onChangeText={setText}
                multiline
                maxLength={500}
              />
            </View>
            <Pressable
              onPress={submit}
              disabled={!text.trim()}
              style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            >
              <Ionicons name="send" size={18} color={text.trim() ? "#fff" : "#cbd5e1"} />
            </Pressable>
          </View>
        ) : null}
      </View>
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
  submitEdit: (id: string) => void;
  confirmDelete: (id: string) => void;
  onReply: () => void;
  onReport: () => void;
  toggleLike: () => void;
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
    submitEdit,
    confirmDelete,
    onReply,
    onReport,
    toggleLike,
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
                <Pressable onPress={() => submitEdit(comment.id)} style={styles.editSave}>
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
          {comment.edited ? <Text style={styles.commentMeta}> · Edited</Text> : null}
          {comment.likes > 0 ? (
            <Text style={styles.commentMeta}> · {comment.likes}</Text>
          ) : null}
          <Pressable onPress={toggleLike} hitSlop={4}>
            <Text style={[styles.commentAction, comment.liked && styles.commentActionOn]}>
              Like
            </Text>
          </Pressable>
          {depth === 0 ? (
            <Pressable onPress={onReply} hitSlop={4}>
              <Text style={styles.commentAction}>Reply</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => setOpenMenu(openMenu === comment.id ? null : comment.id)} hitSlop={4}>
            <Ionicons name="ellipsis-horizontal" size={16} color="#94a3b8" />
          </Pressable>
        </View>
        {openMenu === comment.id ? (
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
                  onPress={() => confirmDelete(comment.id)}
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
        ) : null}
        {comment.replies && comment.replies.length > 0 ? (
          <View style={styles.repliesWrap}>
            {comment.replies.map((r) => (
              <CommentItem
                key={r.id}
                comment={r}
                postId={props.postId}
                depth={depth + 1}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                editingId={editingId}
                setEditingId={setEditingId}
                editingText={editingText}
                setEditingText={setEditingText}
                submitEdit={submitEdit}
                confirmDelete={confirmDelete}
                onReply={onReply}
                onReport={onReport}
                toggleLike={() => props.toggleLike && props.toggleLike()}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "88%",
    paddingBottom: 24,
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.18,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: -8 },
    elevation: 24,
  },
  sheetHeader: {
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
    marginBottom: 8,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    minHeight: 280,
    maxHeight: 520,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 14,
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
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
    gap: 10,
  },
  meAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  meAvatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  composerInputWrap: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 6,
  },
  replyingBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
    marginBottom: 2,
  },
  replyingTo: {
    fontSize: 11,
    color: "#2563eb",
    fontWeight: "700",
  },
  input: {
    fontSize: 14,
    color: "#0f172a",
    paddingTop: 4,
    minHeight: 28,
    maxHeight: 110,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  sendBtnDisabled: {
    backgroundColor: "#cbd5e1",
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
  reportWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    minHeight: 420,
  },
  reportBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  reportBackText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 10,
    marginBottom: 14,
  },
  reportCats: {
    gap: 8,
  },
  reportCat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  reportCatOn: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  reportCatText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  reportCatTextOn: {
    color: "#2563eb",
  },
  reportSubmit: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  reportSubmitDisabled: {
    backgroundColor: "#cbd5e1",
  },
  reportSubmitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});
