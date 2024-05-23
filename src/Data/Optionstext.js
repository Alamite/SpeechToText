export const optionstext = [
    { text: 'Summarization', subtext: 'Indicates whether Deepgram will provide summaries for sections of content.' },
    { text: 'Topic Detection', subtext: 'Indicates whether Deepgram will identify and extract key topics for sections of content.   ' },
    { text: 'Intent Detection', subtext: 'Indicates whether Deepgram will identify intents.' },
    { text: 'Sentiment', subtext: 'Identifies sentiment of positive, neutral, or negative, in addition to a sentiment score. Provides sentiment on the word level, as well as for sentences, paragraphs and segments.' },
    { text: 'Smart Format', subtext: 'Smart Format improves readability by applying additional formatting. When enabled, punctuation and paragraph breaks will be applied as well as formatting of other entities, such as dates, times, and numbers' },
    { text: 'Punctuation', subtext: 'Indicates whether to add punctuation and capitalization to the transcript.' },
    { text: 'Paragraphs', subtext: 'Indicates whether Deepgram will split audio into paragraphs to improve transcript readability. When paragraphs is set to true, punctuate will also be set to true.' },
    { text: 'Utterances', subtext: 'Segments speech into meaningful semantic units. By default, when utterances is enabled, it starts a new utterance after 0.8s of silence. You can customize the length of time used to determine where to split utterances with the utt_split parameter' },
    { text: 'Redaction', subtext: 'Indicates whether to redact sensitive information, replacing redacted content with asterisks (*).' },
    { text: 'Diarization', subtext: 'Indicates whether to recognize speaker changes.' },
];
