import { OPPORTUNITIES, SUGGESTED_CONNECTIONS, TOP_SEVEN, TRENDING_HASHTAGS, type Post } from "@/lib/data";

export type FeedAuthor = {
  name: string;
  headline: string;
  initials: string;
  color: string;
};

export type FeedJob = {
  opportunityId: string;
  title: string;
  company: string;
  location: string;
  type: string;
};

export type SuggestedPerson = {
  id: string;
  name: string;
  headline: string;
  initials: string;
  color: string;
};

export type TrendingTopic = {
  tag: string;
  posts: number;
};

export type FeedItem =
  | ({ id: string; type: "post" } & Post)
  | ({ id: string; type: "suggested_people"; people: SuggestedPerson[] })
  | ({ id: string; type: "trending"; topics: TrendingTopic[] })
  | ({ id: string; type: "opportunity_promo"; job: FeedJob; author: FeedAuthor; text: string; time: string });

export function buildFeed(posts: Post[]): FeedItem[] {
  const items: FeedItem[] = [];
  const postList: Post[] = posts.filter((p) => !p.hidden);

  const postsByPriority = [...postList].sort((a, b) => {
    const score = (p: Post) => {
      let s = 0;
      if (p.fromTopSeven) s += 1000;
      s += Object.values(p.reactionCounts).reduce((sum, n) => sum + (n ?? 0), 0);
      s += p.commentCount * 2;
      s += p.shares * 3;
      s -= Math.floor((Date.now() - p.createdAt) / (1000 * 60 * 60));
      return s;
    };
    return score(b) - score(a);
  });

  postsByPriority.forEach((p, idx) => {
    items.push({ type: "post", ...p, id: `feed-${p.id}` });
    if (idx === 1) {
      items.push({
        id: "feed-suggested-1",
        type: "suggested_people",
        people: SUGGESTED_CONNECTIONS.map((s) => ({
          id: s.id,
          name: s.name,
          headline: s.role,
          initials: s.initials,
          color: s.color,
        })),
      });
    }
    if (idx === 3) {
      items.push({
        id: "feed-trending-1",
        type: "trending",
        topics: TRENDING_HASHTAGS.slice(0, 5),
      });
    }
    if (idx === 5) {
      const opp = OPPORTUNITIES.find((o) => o.id === "opp-5") ?? OPPORTUNITIES[4];
      items.push({
        id: "feed-opp-1",
        type: "opportunity_promo",
        author: {
          name: opp.company,
          headline: "Company · Featured opportunity",
          initials: opp.initials,
          color: opp.color,
        },
        time: "Promoted",
        text: `Recommended for you based on your profile and Top 7 network.`,
        job: {
          opportunityId: opp.id,
          title: opp.title,
          company: opp.company,
          location: opp.location,
          type: opp.type,
        },
      });
    }
  });

  return items;
}

export function buildPostsOnlyFeed(posts: Post[]): FeedItem[] {
  return posts
    .filter((p) => !p.hidden)
    .sort((a, b) => {
      const score = (p: Post) => {
        let s = 0;
        if (p.fromTopSeven) s += 1000;
        s += Object.values(p.reactionCounts).reduce((sum, n) => sum + (n ?? 0), 0);
        s += p.commentCount * 2;
        s += p.shares * 3;
        s -= Math.floor((Date.now() - p.createdAt) / (1000 * 60 * 60));
        return s;
      };
      return score(b) - score(a);
    })
    .map((p) => ({ type: "post" as const, ...p, id: `post-only-${p.id}` }));
}

export function buildFollowingFeed(posts: Post[], connectedIds: Set<string>): FeedItem[] {
  return buildFeed(posts).filter(
    (item) =>
      item.type === "post" &&
      (item.fromTopSeven ||
        item.authorIsCompany ||
        item.authorIsUniversity ||
        connectedIds.has(item.authorId))
  );
}

export { TOP_SEVEN, TRENDING_HASHTAGS, SUGGESTED_CONNECTIONS };
