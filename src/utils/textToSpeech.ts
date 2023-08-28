export const textToSpeech = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.lang = "ja-JP";
  speechSynthesis.speak(utterance);
};
