import { tokenize } from "./tokenizer.js";

export function buildTfIdf(chunks) {
  const docs = chunks.map(c => tokenize(c.content));
  const vocab = new Set(docs.flat());

  const idf = {};
  vocab.forEach(term => {
    const containing = docs.filter(d => d.includes(term)).length;
    idf[term] = Math.log(docs.length / (1 + containing));
  });

  return docs.map(doc => {
    const tf = {};
    doc.forEach(term => {
      tf[term] = (tf[term] || 0) + 1;
    });

    const tfidf = {};
    Object.keys(tf).forEach(term => {
      tfidf[term] = tf[term] * idf[term];
    });

    return tfidf;
  });
}
