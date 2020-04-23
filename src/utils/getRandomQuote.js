// an array of quote objects
// quotes from -> https://www.journaldev.com/240/my-25-favorite-programming-quotes-that-are-funny-too

let quoteList = [
  {
    author: "Anonymous",
    quote:
      "The best thing about a boolean is even if you are wrong, you are only off by a bit. ",
  },
  {
    author: "Louis Srygley",
    quote:
      "Without requirements or design, programming is the art of adding bugs to an empty text file.",
  },
  {
    author: "Ralph Johnson",
    quote: "Before software can be reusable it first has to be usable.",
  },
  {
    author: "Anonymous",
    quote:
      "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2",
  },
  {
    author: "Oktal",
    quote:
      "I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing",
  },
  {
    author: "Gerald Weinberg",
    quote:
      "If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization.",
  },
  {
    author: "Alan J. Perlis",
    quote:
      "There are two ways to write error-free programs; only the third one works",
  },
  {
    author: "Anonymous",
    quote:
      "Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development",
  },
  {
    author: "Anonymous",
    quote: "It’s not a bug – it’s an undocumented feature.",
  },
  {
    author: "Jessica Gaston",
    quote: " man’s crappy software is another man’s full-time job.",
  },
  {
    author: "Doug Linder",
    quote:
      "A good programmer is someone who always looks both ways before crossing a one-way street",
  },
];

// generate random quotes from the array
export function getRandomQuote() {
  let randomNumber = Math.floor(Math.random() * 11);
  // get quotes by array index
  return quoteList[randomNumber];
}
