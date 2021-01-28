import Parser from 'rss-parser';

export type LaMetricFrame = {
  index?: number;
  text: string;
  icon?: string;
};

export type LaMetricFrameList = {
  frames: LaMetricFrame[];
};

export type FormatOptions = {
  /** URL where to retrieve the RSS feed from. */
  url: string;
  /** Maximum number of items to display. Defaults to 5. */
  max?: number;
  /** Optional icon for each LaMetric frame. */
  icon?: string;
};

const sortItems = (item1: Parser.Item, item2: Parser.Item): number => {
  const time1 = item1.pubDate ? new Date(item1.pubDate).getTime() : Date.now();
  const time2 = item2.pubDate ? new Date(item2.pubDate).getTime() : Date.now();

  return time1 > time2 ? -1 : time1 < time2 ? 1 : 0;
};

export const format = (
  { max, icon, url }: FormatOptions,
): Promise<LaMetricFrameList> =>
  new Parser().parseURL(url)
    .then(feed => ({
      frames: feed.items
        // Sort entries based on "pubDate" field.
        .sort(sortItems)
        // Display only certain amount of items from the feed.
        .slice(0, Math.min(max ?? 5, 20))
        // And convert them into LaMetric format.
        .map((item, index) => ({
          index,
          text: `${index + 1}. ${item.title}`,
          icon,
        }))
    }))
    .catch(() => ({
      frames: [{
        text: 'Unable to retrieve RSS feed',
        icon: 'stop',
      }],
    }));
