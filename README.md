# lametric-rss-formatter

Converts RSS feed into format understood by LaMetric smart clock.

## Installation

```bash
$ yarn add lametric-rss-formatter
```

## Usage

```JavaScript
const express = require('express');
const { format } = require('lametric-rss-formatter');

const app = express();

app.get('/', (req, res) =>
  format({ url: 'https://www.reddit.com/.rss' })
    .then((result) => res.send(result))
);
```

### Options

You can pass additional options to the `format` function:

Option | Default value | Description
-------| ------------- | -----------
`icon` | nothing       | Name of the LaMetric icon to display for each item.
`max`  | `5`           | Maximum number of entries to display from the RSS feed.
