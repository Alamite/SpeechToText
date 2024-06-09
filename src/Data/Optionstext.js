import { text } from "@fortawesome/fontawesome-svg-core";

export const optionstext = [
    { text: 'Transcript', subtext:'Generate a transcript that recognize speaker changes'},
    { text: 'Summarization', subtext: 'Generate summaries for sections of content.' },
    { text: 'Topic Detection', subtext: 'Identify and extract key topics for sections of content.   ' },
    { text: 'IDI Classification', subtext: 'Classify IDE.' },
    { text: 'Keywords', subtext: 'Indicates whether to add punctuation and capitalization to the transcript.' },
    { text: 'Trend Line', subtext:'Sample text'},
    { text: 'Paragraphs', subtext: 'Indicates whether Deepgram will split audio into paragraphs to improve transcript readability. When paragraphs is set to true, punctuate will also be set to true.' },
    { text: 'Utterances', subtext: 'Segments speech into meaningful semantic units. By default, when utterances is enabled, it starts a new utterance after 0.8s of silence. You can customize the length of time used to determine where to split utterances with the utt_split parameter' },
];
