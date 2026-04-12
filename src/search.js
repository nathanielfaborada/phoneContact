// Edit Distance — O(m*n)
function editDistance(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// Returns the minimum edit distance between `query` and any
// sliding window of the same length inside `text`.
// This lets short queries match anywhere inside a longer name.
function minWindowDistance(query, text) {
  if (query.length === 0) return 0;
  if (query.length >= text.length) return editDistance(query, text);

  let min = Infinity;
  for (let i = 0; i <= text.length - query.length; i++) {
    const window = text.slice(i, i + query.length);
    const d = editDistance(query, window);
    if (d < min) min = d;
    if (min === 0) break; // exact match found
  }
  return min;
}

// Fuzzy threshold: allow 1 mistake per 4 characters of query
function threshold(query) {
  return Math.floor(query.length / 4);
}

// Returns contacts that fuzzy-match the query (sorted best match first)
export function searchContacts(contacts, query) {
  const q = query.trim().toLowerCase();
  if (!q) return contacts;

  const t = threshold(q);

  const scored = contacts
    .map(contact => {
      const name   = (contact.name   || "").toLowerCase();
      const number = (contact.number || "").toLowerCase();
      const score  = Math.min(
        minWindowDistance(q, name),
        minWindowDistance(q, number)
      );
      return { contact, score };
    })
    .filter(({ score }) => score <= t);

  scored.sort((a, b) => a.score - b.score);
  return scored.map(({ contact }) => contact);
}
